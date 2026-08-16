const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "..", "data", "students.json");

/**
 * Read all students from the JSON data file.
 * Returns an empty array if the file is missing or corrupted.
 */
function getStudents() {
    try {
        const data = fs.readFileSync(dataFile, "utf8");
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        console.error("[store] Error reading students data:", err.message);
        return [];
    }
}

/**
 * Write the students array to the JSON data file.
 */
function saveStudents(students) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(students, null, 2));
    } catch (err) {
        console.error("[store] Error writing students data:", err.message);
        throw err;
    }
}

/**
 * Find a student by id.
 */
function findStudent(id) {
    return getStudents().find(s => s.id === id) || null;
}

/**
 * Create a new student with the next available id.
 */
function createStudent({ name, course, year }) {
    const students = getStudents();
    const nextId = students.length > 0
        ? Math.max(...students.map(s => s.id)) + 1
        : 1;

    const student = { id: nextId, name, course, year };
    students.push(student);
    saveStudents(students);

    return student;
}

/**
 * Update an existing student by id.
 * Returns the updated student, or null if not found.
 */
function updateStudent(id, { name, course, year }) {
    const students = getStudents();
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return null;
    }

    students[index] = { id, name, course, year };
    saveStudents(students);

    return students[index];
}

/**
 * Delete a student by id.
 * Returns true if deleted, false if not found.
 */
function deleteStudent(id) {
    const students = getStudents();
    const filtered = students.filter(s => s.id !== id);

    if (filtered.length === students.length) {
        return false;
    }

    saveStudents(filtered);
    return true;
}

module.exports = {
    getStudents,
    saveStudents,
    findStudent,
    createStudent,
    updateStudent,
    deleteStudent
};