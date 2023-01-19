const express = require('express')
const path = require("path");

const app = express()


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


app.get('/hello', (req, res, next) => {
    console.log('访问的路径：' + req.url);
    res.send("<h1>hello</h1>");

    console.log(next);
})


app.listen(3000, () => {
    console.log("http://127.0.0.1:3000 服务器启动成功");
})