const express = require('express')
const router = express.Router();

// 实际浏览器地址访问的应该是 /session/set
router.get("/session/set", (req, res) => {
  req.session.name = "jelly";
  res.send("设置session成功");
});

router.get("/session/get", (req, res) => {
  res.send(req.session);
});

module.exports = router