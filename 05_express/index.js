const express = require("express");
const path = require("path");

const app = express();
const { readDataTable, writeDataTable } = require("../utils/dataTableAction");

const usersDataPath = path.resolve(__dirname, "./database/users.json");

// 注册的用户数据
let USERS = [];
readDataTable(usersDataPath, { USERS: [] }).then(data => {
    USERS = data.USERS;
});

// 设置静态资源目录
app.use(express.static(path.resolve(__dirname, "./public")));

// 解析请求体的数据 express 默认不会解析请求体中的数据，需要使用中间件
app.use(express.urlencoded());

// get 方法获取表单数据
app.get("/login", (req, res) => {
  const existedUser = USERS.find(
    (user) =>
      user.username === req.query.username &&
      user.password === req.query.password
  );
  if (!existedUser) {
    res.send(
      "用户名或密码错误,或用户不存在，请先去 <a href='/register_form.html'>注册</a> "
    );
  } else {
    res.send("欢迎回来！登陆成功~");
  }
});

app.post("/login", (req, res) => {
  console.log(req.body);

  res.send(req.body);
});

app.post("/registry", (req, res) => {
  const { username, password, repwd, nickname } = req.body;

  const existedUser = USERS.find(
    (user) => user.username === username || user.nickname === nickname
  );

  if (existedUser) {
    res.send("用户名或昵称已存在！");
  } else {
    USERS.push({ username, password, repwd, nickname });
    const writableData = JSON.stringify({ USERS });

    writeDataTable(usersDataPath, writableData).then(() => {
        res.send(`${username}（${nickname}） 注册成功`);
    });
  }
});

// get 方法获取数据的第二种方式
app.get("/hello/:id", (req, res) => {
  res.send(req.params);
});

app.listen(3000, () => {
  console.log("服务器启动成功：http://127.0.0.1:3000");
});
