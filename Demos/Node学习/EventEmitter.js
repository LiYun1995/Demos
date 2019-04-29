//events模块只提供了一个对象:events.EventEmitter  核心就是事件触发与事件监听器功能的封装
// let events = require('events');
// let eventEmitter = new events.EventEmitter();
//EventEmitter 对象如果在实例化时发生错误，会触发 error 事件。当添加新的监听器时，newListener 事件会触发，当监听器被移除时，removeListener 事件被触发。

//用法
let EventEmitter = require('events').EventEmitter;
let event = new EventEmitter();
event.on('some_event', function () {
    console.log('some_event 事件触发');
});
setTimeout(function () {
    event.emit('some_event');
}, 1000);
/* EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。 */
event.on('someEvent', function (arg1, arg2) {
    console.log('listener1', arg1, arg2);
});
event.on('someEvent', function (arg1, arg2) {
    console.log('listener2', arg1, arg2);
})
event.emit('someEvent', 'LYGG', 'Mawaer');

/* 方法 */
/* 1	addListener(event, listener)
为指定事件添加一个监听器到监听器数组的尾部。
2	on(event, listener)
为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
server.on('connection', function (stream) {
  console.log('someone connected!');
});
3	once(event, listener)
为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
server.once('connection', function (stream) {
  console.log('Ah, we have our first user!');
});
4	removeListener(event, listener)
移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。

它接受两个参数，第一个是事件名称，第二个是回调函数名称。

var callback = function(stream) {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
5	removeAllListeners([event])
移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
6	setMaxListeners(n)
默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。
7	listeners(event)
返回指定事件的监听器数组。
8	emit(event, [arg1], [arg2], [...])
按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false。 */

/* 类方法 */
/* 1	listenerCount(emitter, event)
返回指定事件的监听器数量。
events.EventEmitter.listenerCount(emitter, eventName) //已废弃，不推荐
events.emitter.listenerCount(eventName) //推荐 */

/* 事件 */
/* newListener
event - 字符串，事件名称

listener - 处理事件函数

该事件在添加新监听器时被触发。

2	removeListener
event - 字符串，事件名称

listener - 处理事件函数

从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引。 */

/* 实例
   以下实例通过connection(连接)事件演示了EventEmitter类的应用。
*/

let eventEmitter = new EventEmitter();
//监听器1
let listen1 = function listen1() {
    console.log('监听器listener1执行！');
}
//监听器2
let listen2 = function listen2() {
    console.log('监听器listener2执行！');
}
//绑定connection事件,处理函数为listen1
eventEmitter.addListener('connection', listen1)
//绑定connection事件,处理函数为listen2
eventEmitter.on('connection', listen2);
//监听器数量
let listenerCount = eventEmitter.listenerCount('connection');
console.log(listenerCount + '个监听器监听连接事件');
//处理connection事件
eventEmitter.emit('connection');
//移除绑定的listen1函数
eventEmitter.removeListener('connection', listen1);
console.log('listen1不再受监听');
//再次触发
eventEmitter.emit('connection');
//数量
listenerCount = eventEmitter.listenerCount('connection');
console.log(`还有${listenerCount}个监听器监听连接事件`);
console.log('程序执行完毕');

/* error事件 */
/* 当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。

我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。例如： */
eventEmitter.emit('error');

/* 继承 EventEmitter */

/* 大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

为什么要这样做呢？原因有两点：

首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发生应该是一个对象的方法。

其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系 */