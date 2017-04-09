const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
// 使用express的路由
const router = express.Router();
// 这是用来输出路由的，在服务端用来输出。
module.exports = router;

// router 的get 方法
router.get('/', (req, res) => {
    res.end('hello world, again!');
});


router.get('/product/:id',(req,res,next)=> {
	// res.send('1232');
	// res.json({a:'123',b:'456'});
	if (products.length <= req.params.id || req.params.id < 0) {
      res.statusCode = 404;
      return res.send('Error 404: No products found')
   }
   if (req.params.id == 0) {
   		next('route');
   } else {
   		res.json(products[req.params.id]);
  }
},(req,res,next)=>{
	res.json({code:"-1",msg:'no data'});
});

router.get('/product/:id',(req,res)=> {
	res.end('123');
});

router.post('/product',(req,res)=> {
	// var pic = req.body('pic');
	var number = req.param('num');
    // console.log(number)
    res.end(number);
	// res.json({pic:pic,number:number});

//修改产品
router.put('/product', (req, res) => {
    // res.send('1232');
    // res.json({a:'123',b:'456'});
    res.json(req.body);
});


router.get('/test', (req, res) => {
	res.json({
        a: '123',
        b: '456'
    });
    var db = require('mongoskin').db('localhost:27017/test');
    db.collection('my_score_col').find().toArray(function(err, result) {
        // if (err) throw err;
        // console.log(result);
        res.end(result);
    });
    
})
