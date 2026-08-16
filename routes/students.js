const express = require("express");
const store = require("../lib/store");

const router = express.Router();

// Validate student input, returns { name, course, year } or null
function validateStudent(body) {
    const name = (body.name || "").toString().trim();
    const course = (body.course || "").toString().trim().toUpperCase();
    const year = Number(body.year);

    if (!name || !course || !Number.isInteger(year) || year < 1 || year > 5) {
        return null;
    }

    return { name, course, year };
}

// Helper to filter students by search query
function filterStudents(students, search) {
    if (!search) return students;
    const q = search.toLowerCase();
    return students.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q) ||
        String(s.year).includes(q)
    );
}

// Home page - display students (with optional search)
router.get("/", (req, res) => {
    const search = (req.query.search || "").trim();
    const students = store.getStudents();
    const filtered = filterStudents(students, search);

    res.render("index", {
        title: "Student Management System",
        students: filtered,
        search: search,
        total: students.length
    });
});

// Add student page
router.get("/add", (req, res) => {
    res.render("add", {
        title: "Add Student"
    });
});

// Add student
router.post("/add", (req, res) => {
    const student = validateStudent(req.body);

    if (!student) {
        return res.status(400).render("add", {
            title: "Add Student",
            error: "All fields are required and Year must be between 1 and 5.",
            values: req.body
        });
    }

    const created = store.createStudent(student);

    req.flash("success", `Student "${created.name}" added successfully!`);
    res.redirect("/");
});

// Edit student page
router.get("/edit/:id", (req, res) => {
    const student = store.findStudent(Number(req.params.id));

    if (!student) {
        return res.status(404).send("Student not found");
    }

    res.render("edit", {
        title: "Edit Student",
        student: student
    });
});

// Update student
router.post("/edit/:id", (req, res) => {
    const student = store.findStudent(Number(req.params.id));

    if (!student) {
        return res.status(404).send("Student not found");
    }

    const updated = validateStudent(req.body);

    if (!updated) {
        return res.status(400).render("edit", {
            title: "Edit Student",
            error: "All fields are required and Year must be between 1 and 5.",
            student: student,
            values: req.body
        });
    }

    store.updateStudent(student.id, updated);

    req.flash("success", `Student "${updated.name}" updated successfully!`);
    res.redirect("/");
});

// Delete student
router.post("/delete/:id", (req, res) => {
    const deleted = store.deleteStudent(Number(req.params.id));

    if (!deleted) {
        return res.status(404).send("Student not found");
    }

    req.flash("success", "Student deleted successfully!");
    res.redirect("/");
});

module.exports = router;