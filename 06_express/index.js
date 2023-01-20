const express = require("express");
const path = require("path");

const app = express();

const { readDataTable, writeDataTable } = require("../utils/dataTableAction");
const studentsTablePath = path.resolve(__dirname, "./database/students.json");

let students = [];
readDataTable(studentsTablePath, []).then((data) => {
  students = data;
});

// 配置静态页面
app.use(express.static(path.resolve(__dirname, "public")));

// 配置请求体解析
app.use(express.urlencoded({ extended: true }));

// 配置请求路由处理
app.get("/hello", (req, res) => {
  res.send("<h1>hello</h1>");
});

// 将 ejs 设置为默认模板引擎，使页面中可以嵌入变量，创建动态页面
app.set("view engine", "ejs");

// 配置模板路径, 第一个参数是指定 模板引擎，第二个是 模板目录
app.set("views", path.resolve(__dirname, "views"));

/*
    <%= %> 会将特殊字符进行转义，标签元素会原样输出
    <%- %> 变量值是什么 就显示什么
    <% %> 里面可以写 JS
*/

app.get("/students", (req, res) => {
  res.render("students", {
    name: "jelly",
    age: 30,
    gender: "name",
    info: "<h3>程序员</h3>",
    students,
  });
});

app.post("/add_student", (req, res) => {
  const { name, gender, age, address } = req.body;
  const student = { id: Date.now(), name, gender, age, address };

  students.push(student);
  writeDataTable(studentsTablePath, JSON.stringify(students)).then(() => {
    res.redirect("/students");
  });
});

app.get("/edit_student", (req, res) => {
  student = students.find((student) => +student.id === +req.query.id);

  res.render("edit_student", { student });
});

app.post("/edit_student", (req, res) => {
    const newStudent = req.body;

    students = students.map((item) => {
      if (+item.id === +newStudent.id) {
        return newStudent;
      }
      return item;
    });
    writeDataTable(studentsTablePath, JSON.stringify(students)).then(() => {
      res.redirect("/students");
    });
});

app.get('/delete_student', (req, res) => {
    students = students.filter((student) => +student.id !== +req.query.id);

    writeDataTable(studentsTablePath, JSON.stringify(students)).then(() => {
        res.redirect('/students')
    })
})

// 配置错误不匹配路由处理，在所有路由配置最后，优先级最低
app.use((req, res) => {
  res.status(404);
  res.send("<h1>您访问的页面已被外星人劫持~</h1>");
});

app.listen(3000, () => {
  console.log("服务器启动成功：http://127.0.0.1:3000");
});
