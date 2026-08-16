const express = require("express");
const path = require("path");

const { parseCookies, csrfProtection } = require("./lib/csrf");
const { securityHeaders } = require("./middleware/security");
const { flashMiddleware } = require("./middleware/flash");
const studentsRouter = require("./routes/students");

const app = express();
const PORT = process.env.PORT || 3000;

// Views & static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Security headers
app.use(securityHeaders);

// Cookie parsing + flash messages (must run before CSRF)
app.use(parseCookies);
app.use(flashMiddleware);

// CSRF protection (exposes csrfToken to all templates)
app.use(csrfProtection);

// Routes
app.use("/", studentsRouter);

// 404 catch-all
app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});