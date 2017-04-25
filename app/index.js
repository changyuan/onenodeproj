var crypto = require('crypto');
const express = require('express');
const path = require('path');

var User = require('../models/user.js');
var Post = require('../models/post.js');

// 使用express的路由
const router = express.Router();
// 这是用来输出路由的，在服务端用来输出。
module.exports = router;


router.get('/', function(req,res){
    res.render('/users/index',{
      title: '主页',
      user: req.session.user,
      posts: posts,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
});


router.get('/users/reg', checkNotLogin);


router.get('/users/reg', function(req, res) {
    res.render('reg', {
        title: '注册',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});


router.post('/users/reg', checkNotLogin);


router.post('/users/reg', function(req, res) {

    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];


    //检验用户两次输入的密码是否一致
    if (password_re != password) {
        req.flash('error', '两次输入的密码不一致!');
        return res.redirect('/reg');
    }


    //生成密码的散列值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: req.body.name,
        password: password,
        email: req.body.email
    });


    //检查用户名是否已经存在 
    User.get(newUser.name, function(err, user) {
        if (user) {
            err = '用户已存在!';
        }
        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }
        //如果不存在则新增用户
        newUser.save(function(err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser; //用户信息存入session
            req.flash('success', '注册成功!');
            res.redirect('/');
        });
    });

});


router.get('/users/login', checkNotLogin);


router.get('/users/login', function(req, res) {
    res.render('login', {
        title: '登录',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});


router.post('/users/login', checkNotLogin);



router.post('/users/login', function(req, res) {
    //生成密码的散列值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检查用户是否存在
    User.get(req.body.name, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在!');
            return res.redirect('/login');
        }
        //检查密码是否一致
        if (user.password != password) {
            req.flash('error', '密码错误!');
            return res.redirect('/login');
        }
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        req.flash('success', '登陆成功!');
        res.redirect('/');
    });
});


router.get('/users/post', checkLogin);


router.get('/users/post', function(req, res) {
    res.render('post', {
        title: '发表',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});


router.post('/users/post', checkLogin);


router.post('/users/post', function(req, res) {});


router.get('/users/logout', checkLogin);


router.get('/users/logout', function(req, res) {
    req.session.user = null;
    req.flash('success', '登出成功!');
    res.redirect('/');
});


router.post('/users/post', function(req, res){
  var currentUser = req.session.user,
      post = new Post(currentUser.name, req.body.title, req.body.post);
  post.save(function(err){
    if(err){
      req.flash('error', err); 
      return res.redirect('/');
    }
    req.flash('success', '发布成功!');
    res.redirect('/');
  });
});


function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        return res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {

    if (req.session.user) {
        req.flash('error', '已登录!');
        return res.redirect('/');
    }
    next();
}