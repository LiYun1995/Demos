let fs = require('fs')
// let data = fs.readFileSync('input.txt'); // 同步  阻塞模式
// console.log(data.toString());
// console.log('程序执行结束')
console.log('读取中....')
fs.readFile('input.txt',function(err,data){  //异步  非阻塞模式
    if(err){
        return console.error(err.stack);
    }
    console.log(data.toString());
});

console.log('程序执行完毕')