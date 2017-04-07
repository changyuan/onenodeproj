/* 1. nodejs web 基础 实现*/
/* var http = require('http');

function handleRequests(req,res){
	res.end('Hello World');
}
var server = http.createServer(handleRequests).listen(8080,function(){
	console.log('Listening on port 8080');
});

// 2. 一个最简单的web请求 website demo  es6 语法
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//创建服务，并返回状态码，header头，以及记过字符创
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

//监听端口并在terminal中输出信息
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/


// express 框架
const express = require('express');
// express ejs 的布局模板
const expressLayouts = require('express-ejs-layouts');
// body 内容解析
const bodyParser = require('body-parser');

const multer = require('multer'); 

const app = express();
// 如果设置端口使用环境变量中的，否则为8080
const port = process.env.PORT || 8080;

// 设置模板引擎 ejs
app.set('view engine', 'ejs');
// 添加到应用
app.use(expressLayouts);

// app.use(multer()); 

// use body parser 解析body参数
app.use(bodyParser.urlencoded({ extended: true }));

// 加载自己的路由，用来分开url不同的请求
const router = require('./app/routes');
// 路由加载到应用
app.use('/', router);

const api = require('./app/api');

app.use('/api', api);

// static css img 静态资源
app.use(express.static(`${__dirname}/public`));


// 监听端口，并提示应用启动提示
app.listen(port, () => {
  console.log('app started');
});
