const express = require('express');
const path = require('path');

const fs = require("fs");

// 使用express的路由
const router = express.Router();
// 这是用来输出路由的，在服务端用来输出。
module.exports = router;
// router 的get 方法
router.get('/', (req, res) => {
    // res.end('hello world, again!');
    // console.log(path);
    // res.sendFile(path.join(__dirname ,'../index.html'));
    // 加载视图页面的模板
    res.render('pages/home');
});
// 在传递数据中怎么试用，在render第二个参数中传递数据对象即可
router.get('/about', (req, res) => {
    const users = [{
        name: 'Holly',
        email: 'holly@scotch.io',
        avatar: 'http://placekitten.com/200/286'
    }, {
        name: 'Chris',
        email: 'chris@scotch.io',
        avatar: 'http://placekitten.com/200/286'
    }, {
        name: 'Ado',
        email: 'Ado@scotch.io',
        avatar: 'http://placekitten.com/408/287'
    }, {
        name: 'Samantha',
        email: 'Samantha@scotch.io',
        avatar: 'http://placekitten.com/700/700'
    }, ];
    res.render('pages/about', {
        users
    });
});


router.get('/contact', (req, res) => {
    res.render('pages/contact');
});


// 在请求过来之后，怎样获得数据。
router.post('/contact', (req, res) => {
    res.send(`Thanks for contacting us, ${req.body.name}! We will respond shortly!`);
});


//上传
router.get('/upload',(req,res) => {

    res.render('pages/upload');
});

router.post('/upload',(req,res) => {

   // 上传的文件信息
   console.log(req.files);

 
   // var des_file =  "/public/upload/" + req.files[0].originalname;
   // var des_file =  __dirname + '/' + req.files[0].originalname;
   var des_file =  __dirname + '/../public/upload/' + Math.random();
   console.log(des_file);

   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });


});