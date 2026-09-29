const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let students = [
    {
        id: 1,
        name: "Ali",
        email: "ali@gmail.com",
        age: 20,
        marks: 85
    },
    {
        id: 2,
        name: "Ahmed",
        email: "ahmed@gmail.com",
        age: 21,
        marks: 72
    }
];

app.get("/api/students", function(req, res) {
    res.json(students);
});

app.get("/api/students/:id", function(req, res) {
    let id = Number(req.params.id);

    let student = students.find(function(item) {
        return item.id === id;
    });

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

app.post("/api/students", function(req, res) {
    let student = {
        id: students.length > 0 ? Math.max(...students.map(function(item) {
            return item.id;
        })) + 1 : 1,
        name: req.body.name,
        email: req.body.email,
        age: Number(req.body.age),
        marks: Number(req.body.marks)
    };

    if (!student.name || !student.email || !student.age || isNaN(student.marks)) {
        return res.status(400).json({
            message: "Please enter all student details"
        });
    }

    students.push(student);

    res.status(201).json(student);
});

app.put("/api/students/:id", function(req, res) {
    let id = Number(req.params.id);

    let student = students.find(function(item) {
        return item.id === id;
    });

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.email = req.body.email;
    student.age = Number(req.body.age);
    student.marks = Number(req.body.marks);

    res.json(student);
});

app.delete("/api/students/:id", function(req, res) {
    let id = Number(req.params.id);

    let student = students.find(function(item) {
        return item.id === id;
    });

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students = students.filter(function(item) {
        return item.id !== id;
    });

    res.json({
        message: "Student deleted successfully"
    });
});

app.listen(PORT, function() {
    console.log("Server running at http://localhost:" + PORT);
});
