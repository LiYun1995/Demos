let http = require('http');
let express = require('express');
let app = express();
console.log(app);
http.createServer(function (request, response) {
    //发送HTTP头部 
    //HTTP状态值：200：OK
    //内容类型：text/plain
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    //发送响应数据hello world
    response.end('hello world\n');
}).listen(8888);

//终端打印如下数据
console.log('服务器跑起，地址http://127.0.0.1:8888/');