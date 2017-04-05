const express = require('express');
const path = require('path');

// 使用express的路由
const router = express.Router();

// 这是用来输出路由的，在服务端用来输出。
module.exports = router;


// router 的get 方法
router.get('/', (req, res) => {
    res.end('hello world, again!');
});


router.get('/haha',(req,res)=> {
	// res.send('1232');
	res.json({a:'123',b:'456'});
});

router.put('/haha',(req,res)=> {
	// res.send('1232');
	res.json({a:'123',b:'456'});
});

router.post('/haha',(req,res)=> {
	// res.send('1232');
	res.json({a:'123',b:'456'});
});