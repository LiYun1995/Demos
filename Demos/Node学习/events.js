/* //引入events模块
let events = require('events')
//创建eventEmitter对象
let eventEmitter = new events.EventEmitter();

//绑定事件及事件的处理程序
eventEmitter.on('eventName',eventHandler);

//触发事件
eventEmitter.emit('eventName'); */

//实例

let events = require('events');
let eventEmitter = new events.EventEmitter();
//创建事件处理程序
let connectHandler = function connected(){
    console.log('连接成功！');
    //触发data_received事件
    eventEmitter.emit('data_received');
}
//绑定connection事件处理程序
eventEmitter.on('connection',connectHandler);
//使用匿名函数绑定data_received事件
eventEmitter.on('data_received',function(){
    console.log('数据接收成功！');
});
//触发connection事件
eventEmitter.emit('connection');
console.log('程序执行完毕。');

//在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。