const express = require('express')
const path = require("path");

const app = express()

/*
    中间件
        - 使用 app.use() 定义
        - 必须放在路由处理之前
        - 形式上 跟路由处理很像
        - 不区分请求方法，路径不区分大小
        - 不添加 第一个参数-路径 时，相当于 ‘/’, 匹配所有请求
        - 添加第一个路径参数时，标识匹配 当前目录及一下目录路径
        - 可以对请求的路径 进行权限认证
*/

/*
    使用 express.static 中间件函数，配置静态资源目录，当访问 根目录时，直接返回静态网页 index.html
    包括字体，图片 css js 音视频等 都要放到静态资源目录，这样在 index.html 中 引用静态资源时，
    使用的路径才不会报错
*/
app.use(express.static(path.resolve(__dirname, './public')))

app.get('/login', (req, res) => {
    // console.log( '参数：', req.params)
    // console.log("请求体：", req.body);
    // console.log("请求头：", req.headers);
    // console.log("查询对象：", req.query);

    if (req.query.username === 'jelly' && req.query.password === '123123') {
        res.send('登陆成功')
    } else {
        res.send('用户名或密码错误')
    }
})

// 当以 get 方法访问 根路径时，处理请求和响应
app.get('/hello', (req, res, next) => {
    console.log('访问的路径：' + req.url);

    // 只发送 响应状态
    // res.sendStatus(404)

    // 设置响应状态 暂不发给客户端
    // res.status(404)

    // 该方法 返回一个 res 对象
    // 给客户端返回响应，同时设置状态码 为 200
    res.send("<h1>hello</h1>");

    console.log(next);
})

// 访问 协议名://ip地址:端口号/路径
// 访问 http://127.0.0.1:3000
// 访问 http://localhost:3000
app.listen(3000, () => {
    console.log("http://127.0.0.1:3000 服务器启动成功");
})