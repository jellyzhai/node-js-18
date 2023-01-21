const express = require("express");
const router = express.Router();
const path = require("path");

const { writeDataTable } = require("../../utils/dataTableAction");
const studentsTablePath = path.resolve(__dirname, "../database/students.json");
let students = require("../database/students.json");

router.use((req, res, next) => {
  if (req.session.loginUser) {
    // 表示下一个 中间件 或 请求处理方法
    next();
  } else {
    res.redirect("/");
  }
})

router.get("/student/list", (req, res) => {
  res.render("students", {
    name: "jelly",
    age: 30,
    gender: "name",
    info: "<h3>程序员</h3>",
    students,
  });
});

router.post("/student/add", (req, res) => {
  const { name, gender, age, address } = req.body;
  const student = { id: Date.now(), name, gender, age, address };

  students.push(student);
  writeDataTable(studentsTablePath, JSON.stringify(students)).then(() => {
    res.redirect("/student/list");
  });
});

router.get("/student/edit", (req, res) => {
  student = students.find((student) => +student.id === +req.query.id);

  res.render("edit_student", { student });
});

router.post("/student/edit", (req, res) => {
  const newStudent = req.body;

  students = students.map((item) => {
    if (+item.id === +newStudent.id) {
      return newStudent;
    }
    return item;
  });
  writeDataTable(studentsTablePath, JSON.stringify(students)).then(() => {
    res.redirect("/student/list");
  });
});

router.get("/student/delete", (req, res) => {
  students = students.filter((student) => +student.id !== +req.query.id);

  writeDataTable(studentsTablePath, JSON.stringify(students)).then(() => {
    res.redirect("/student/list");
  });
});

module.exports = router;
