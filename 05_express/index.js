const express = require('express')
const path = require('path')

const app = express()

// 注册的用户数据
const USERS = []

// 设置静态资源目录
app.use(express.static(path.resolve(__dirname, './public')))

// 解析请求体的数据
app.use(express.urlencoded())

// get 方法获取表单数据
app.get('/login', (req, res) => {
    if (req.query.username === 'admin' && req.query.password === '123123') {
        res.send('欢迎回来！登陆成功~')
    } else {
        res.send('用户名或密码错误')
    }
})

app.post('/login', (req, res) => {
    console.log(req.body)

    // express 默认不会解析请求体中的数据，需要使用中间件
    res.send(req.body)
})

app.post('/registry', (req, res) => {
    const {username, password, repwd, nickname} = req.body;

    USERS.push({ username, password, repwd, nickname });

    console.log(req.body)

    // express 默认不会解析请求体中的数据，需要使用中间件
    res.send(req.body)
})

// get 方法获取数据的第二种方式
app.get('/hello/:id', (req, res) => {
    res.send(req.params)
})

app.listen(3000, () => {
    console.log('服务器启动成功：http://127.0.0.1:3000');
})