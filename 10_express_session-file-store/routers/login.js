// 这里可以写 商品的路由
const path = require("path");
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (name === "admin" && password === "123123") {
    req.session.loginUser = "admin";
    req.session.save(() => {
      res.send(
        '登录成功！可访问<a href="/student/list" target="self">学生列表</a>'
      );
    });
  } else {
    res.send("用户名或密码错误！");
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = router;
