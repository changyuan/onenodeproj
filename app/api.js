const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
// 使用express的路由
const router = express.Router();
// 这是用来输出路由的，在服务端用来输出。

const mongoose = require('mongoose');

const db_connect = require('../config/mongo');

db_connect.connect();

var Product = require('../models/product');

module.exports = router;



// router 的get 方法
router.get('/', (req, res) => {
    res.end('hello world, again!');
});

router.get('/products', (req, res) => {

    
    Product.find((err,doc)=>{
        if (err) {throw err;}

        res.json(doc);
    });

});

router.get('/product/:name', (req, res, next) => {

    if (req.params.name == "") {
        next('route');
    } else {
        Product.find({ name: req.params.name }, function(err, p) {
          if (err) throw err;

          res.json(p);
        });
    }
}, (req, res, next) => {
    res.json({
        code: "-1",
        msg: 'no data'
    });
});


router.post('/product', (req, res) => {

   var model = new Product({
        'name':req.body.name,
        'image':'http://pic.service.yaolan.com/32/20170413/80/1492073368656_1_w180_h300_o.jpg',
        'summary': req.body.summary,
        'price': req.body.price,
        'number': req.body.number,
    });

   model.dudify((err, name)=>{
        if (err) throw err;

        console.log('goods new name is ' + name);
   });

   model.save(function(err) {
      if (err) throw err;

       res.json({code:1,msg:'success'});
    });

});



//修改产品
router.put('/product', (req, res) => {


    Product.find({ name: req.body.name }, function(err, item) {
      if (err) throw err;
      // console.log(item);
      // item.name = item.name + "商品";

      // save the user
      item.save(function(err) {
        if (err) throw err;

        res.json(item);
      });

    });
});


router.delete('/product', (req, res) => {

    Product.find({ name: req.body.name }, function(err, item) {
      if (err) throw err;

      item.remove(function(err) {
        if (err) throw err;

        res.json({
            code:1,
            msg:'success'
        });
      });

    });


    //方法2
    // Product.findOneAndRemove({ name: req.params.name }, function(err) {
    //   if (err) throw err;

    //     res.json({
    //         code:1,
    //         msg:'success'
    //     });
    // });


    // 方法3
    // User.findByIdAndRemove(4, function(err) {
    //   if (err) throw err;

    //   console.log('User deleted!');
    // });

});


router.get('/cookie',(req,res)=>{
    console.log("Cookies: ", req.cookies);
    res.end(req.cookies.bdshare_firstime);
});
