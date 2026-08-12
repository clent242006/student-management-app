const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Location of our JSON database
const dataFile = path.join(__dirname, "data", "students.json");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use EJS as the template engine
app.set("view engine", "ejs");

// Read students from JSON file
function getStudents() {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
}

// Save students to JSON file
function saveStudents(students) {
    fs.writeFileSync(
        dataFile,
        JSON.stringify(students, null, 2)
    );
}

// Home page - display students
app.get("/", (req, res) => {
    const students = getStudents();

    res.render("index", {
        students: students
    });
});

// Add student page
app.get("/add", (req, res) => {
    res.render("add");
});

// Add student
app.post("/add", (req, res) => {
    const students = getStudents();

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,
        name: req.body.name,
        course: req.body.course,
        year: Number(req.body.year)
    };

    students.push(newStudent);
    saveStudents(students);

    res.redirect("/");
});

// Edit student page
app.get("/edit/:id", (req, res) => {
    const students = getStudents();

    const student = students.find(
        student => student.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).send("Student not found");
    }

    res.render("edit", {
        student: student
    });
});

// Update student
app.post("/edit/:id", (req, res) => {
    const students = getStudents();

    const index = students.findIndex(
        student => student.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).send("Student not found");
    }

    students[index].name = req.body.name;
    students[index].course = req.body.course;
    students[index].year = Number(req.body.year);

    saveStudents(students);

    res.redirect("/");
});

// Delete student
app.post("/delete/:id", (req, res) => {
    let students = getStudents();

    students = students.filter(
        student => student.id !== Number(req.params.id)
    );

    saveStudents(students);

    res.redirect("/");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});