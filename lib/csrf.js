const crypto = require("crypto");

const COOKIE_NAME = "csrfToken";

// Attaches parsed cookies to req.cookies
function parseCookies(req, res, next) {
    req.cookies = {};
    const header = req.headers.cookie;
    if (header) {
        header.split(";").forEach((pair) => {
            const [name, ...valueParts] = pair.trim().split("=");
            if (name) {
                req.cookies[name] = decodeURIComponent(valueParts.join("="));
            }
        });
    }
    next();
}

function setSessionCookie(res, name, value) {
    res.setHeader(
        "Set-Cookie",
        `${name}=${encodeURIComponent(value)}; HttpOnly; SameSite=Lax; Path=/`
    );
}

// CSRF protection using double-submit cookie pattern
function csrfProtection(req, res, next) {
    if (!req.cookies[COOKIE_NAME]) {
        const token = crypto.randomBytes(24).toString("hex");
        setSessionCookie(res, COOKIE_NAME, token);
        req.cookies[COOKIE_NAME] = token;
    }

    res.locals.csrfToken = req.cookies[COOKIE_NAME];

    const safeMethods = ["GET", "HEAD", "OPTIONS"];
    if (safeMethods.includes(req.method)) {
        return next();
    }

    const sentToken = req.body._csrf;
    if (sentToken && sentToken === req.cookies[COOKIE_NAME]) {
        return next();
    }

    return res.status(403).send("Invalid or missing CSRF token");
}

module.exports = {
    parseCookies,
    csrfProtection,
    COOKIE_NAME
};