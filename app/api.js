const express = require('express');
const path = require('path');

// 使用express的路由
const router = express.Router();

// 这是用来输出路由的，在服务端用来输出。
module.exports = router;


const products  = [{id:"1",name:"product1",price:"100"},{id:"2",name:"product2",price:"100"}];


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
});


router.put('/product',(req,res)=> {
	// res.send('1232');
	res.json({a:'123',b:'456'});
});