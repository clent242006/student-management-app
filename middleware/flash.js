// Simple flash message middleware using cookies.
// req.flash(type, message) stores a message; the next request sees it once.

const FLASH_COOKIE = "flashMessage";

function flashMiddleware(req, res, next) {
    const message = req.cookies[FLASH_COOKIE];
    if (message) {
        try {
            res.locals.flash = JSON.parse(
                Buffer.from(message, "base64").toString("utf8")
            );
        } catch (err) {
            // Ignore malformed flash cookie
        }
        res.clearCookie(FLASH_COOKIE);
    }

    req.flash = (type, text) => {
        const data = JSON.stringify({ type, text });
        res.cookie(
            FLASH_COOKIE,
            Buffer.from(data).toString("base64"),
            { httpOnly: true, sameSite: "lax", path: "/" }
        );
    };

    next();
}

module.exports = { flashMiddleware };