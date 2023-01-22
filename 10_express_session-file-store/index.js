const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
// 安装使用插件 进行持久化 存储, 解决服务器 重启，导致session 丢失问题
const FileStore = require("session-file-store")(expressSession);

const app = express();

const studentRouter = require("./routers/student");

const loginRouter = require("./routers/login");

const sessionRouter = require("../09_express_session/routers/session");

// 配置静态页面
app.use(express.static(path.resolve(__dirname, "public")));

// 配置请求体解析
app.use(express.urlencoded({ extended: true }));

// 配置 cookie 解析器
app.use(cookieParser());

// 配置 session , secret 用于生成带 hello 表示的 ID，作为 cookie 值发给客户端
// 配置后，就会在 请求的 req 中多出 session 属性可以设置
// session 是服务器中 存在内存中的一个对象，默认为 一次会话的有效期，浏览器关闭后就失效，重启服务器也失效
// 在 session 插件中 配置 持久化存储, 会在当前新项目中 创建文件
app.use(
  expressSession({
    store: new FileStore({
      // 设置 session 存储的文件路径
      // path: path.resolve(__dirname, "./sessions"),

      // 使用加密参数 非明文保存
      // secret: "test",

      // session 过期时间，默认 1小时，一般不设置，因为 cookie 有效期是基础影响
      // ttl: 3600,

      // 默认每隔1小时，清除过期的session，与 ttl 设置有关
      // reapInterval: 3600,
    }),
    secret: "hello",
  })
);

// 将 ejs 设置为默认模板引擎，使页面中可以嵌入变量，创建动态页面
app.set("view engine", "ejs");

// 配置模板路径, 第一个参数是指定 模板引擎，第二个是 模板目录
// app.set("views", path.resolve(__dirname, "views"));

// 配置请求路由处理
app.get("/", (req, res) => {
  res.render("login");
});

// 引入 goods 路由
app.use(loginRouter);

// 引入 session 路由
app.use(sessionRouter);

// 引入 student 路由
app.use(studentRouter);

// 配置错误不匹配路由处理，在所有路由配置最后，优先级最低
app.use((req, res) => {
  res.status(404);
  res.send("<h1>您访问的页面已被外星人劫持~</h1>");
});

app.listen(3000, () => {
  console.log("服务器启动成功：http://127.0.0.1:3000");
});
