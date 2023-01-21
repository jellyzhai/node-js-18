const express = require("express");
const router = express.Router();
const path = require("path");

const { writeDataTable } = require("../../utils/dataTableAction");
const studentsTablePath = path.resolve(__dirname, "../database/students.json");
let students = require("../database/students.json");

router.get("/student/list", (req, res) => {
  const { user_cookie } = req.cookies;

  if (!user_cookie) {
    res.redirect("/");
  } else {
    const [name, cookieVal] = user_cookie.split("=");
    const userCookieData = require("../database/user_cookie.json");

    const existedCookie = userCookieData.find(
      (item) =>
        Object.keys(item)[0] === name && +Object.values(item)[0] === +cookieVal
    );

    if (existedCookie) {
      res.render("students", {
        name: "jelly",
        age: 30,
        gender: "name",
        info: "<h3>程序员</h3>",
        students,
      });
    } else {
      res.redirect("/");
    }
  }
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
