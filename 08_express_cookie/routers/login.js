// 这里可以写 商品的路由
const path = require("path");
const express = require("express");
const router = express.Router();

const { writeDataTable } = require("../../utils/dataTableAction");
const userCookieDataPath = path.resolve(__dirname, '../database/user_cookie.json')

router.post('/login', (req, res) => {
    const { name, password } = req.body;

    if (name === 'admin' && password === '123123') {
        const cookieVal = Date.now();

        const cookies = require('../database/user_cookie.json');
        cookies.push({admin: cookieVal})

        writeDataTable(userCookieDataPath, JSON.stringify(cookies)).then(() => {
          res.cookie("user_cookie", "admin=" + cookieVal, {
            maxAge: 1000 * 5 // 5s 之后 cookie 过期
          });
          res.send(
            '登录成功！可访问<a href="/student/list" target="self">学生列表</a>'
          );
        });
    } else {
        res.send('用户名或密码错误！');
    }

})

module.exports = router;