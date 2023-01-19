const express = require('express')

const app = express()

// 访问 协议名://ip地址:端口号/路径
// 访问 http://127.0.0.1:3000
// 访问 http://localhost:3000
app.listen(3000, () => {
    console.log("http://127.0.0.1:3000 服务器启动成功");
})

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

// app.use('/hello', (req, res, next) => {
//     console.log('中间件生效了');
//     next();
// })

// next 是下一个 中间件，或者处理路径请求的方法
app.use((req, res, next) => {
    console.log('111');
    next();
})

app.use((req, res, next) => {
    console.log('222');
    next();
})

// 当以 get 方法访问 根路径时，处理请求和响应
app.get('/', (req, res, next) => {
    console.log('有人访问我了');
    console.log(req.url);

    // 只发送 响应状态
    // res.sendStatus(404)

    // 设置响应状态 暂不发给客户端
    // res.status(404)

    // 该方法 返回一个 res 对象
    // 给客户端返回响应，同时设置状态码 为 200
    res.send("<h1>hello</h1>");

    console.log(next);
})