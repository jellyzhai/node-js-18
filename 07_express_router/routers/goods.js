// 这里可以写 商品的路由
const express = require("express");
const router = express.Router();

router.get('/goods/list', (req, res) => {
    res.send('this is goods list.')
})

module.exports = router;