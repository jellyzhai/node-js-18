const express = require("express");
const path = require("path");

const app = express();

const studentRouter = require('./routers/student')

const goodsRouter = require('./routers/goods')

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

// 引入 student 路由
app.use(studentRouter);

// 引入 goods 路由
app.use(goodsRouter);

// 配置错误不匹配路由处理，在所有路由配置最后，优先级最低
app.use((req, res) => {
  res.status(404);
  res.send("<h1>您访问的页面已被外星人劫持~</h1>");
});

app.listen(3000, () => {
  console.log("服务器启动成功：http://127.0.0.1:3000");
});
