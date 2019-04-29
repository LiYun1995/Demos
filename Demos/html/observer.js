let pubsub = {};
(function (q) {
    let topics = {} //回调函数存放的数组
    let subUid = -1
    //发布方法
    q.publish = function (topic, args) {
        if (!topics[topic]) {
            return false;
        }

        setTimeout(function () {
            let subscribers = topics[topic]
            let len = subscribers ? subscribers.length : 0;
            while (len--) {
                subscribers[len].func(topic, args);
            }
        }, 0);
        return true;
    };

    //订阅方法
    q.subscribe = function (topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }

        let token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    //退订方法
    q.unsubscribe = function (token) {
        for (let m in topics) {
            if (topics[m]) {
                for (let i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };
}(pubsub));

//订阅一个
pubsub.subscribe('example1', function (topic, data) {
    console.log(topic + ':' + data);
});
pubsub.subscribe('example2', function (topic, data) {
    console.log(topic + ':' + data);
});
//发布通知
pubsub.publish('example1','hello world');
pubsub.publish('example1',['test','a','b','c']);
pubsub.publish('example3',['test','a','b','c']);
pubsub.publish('example1', [{ 'color': 'blue' }, { 'text': 'hello'}]);