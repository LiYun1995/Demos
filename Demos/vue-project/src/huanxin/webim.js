import store from '@/store'
// window.Strophe = require('strophe.js').Strophe
// let WebIM = require('easemob-websdk')
let WebIM = require('hx-websdk')
// require('hx-emedia')
// WebIM.WebRTC = require('hx-webrtc')
WebIM.config = {
    /*
     * XMPP server
     */
    xmppURL: 'im-api.easemob.com',
    /*
     * Backend REST API URL
     */
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
    /*
     * Application AppKey
     */
    appkey: '你们公司的环信AppKey',

    /*
     * Whether to use wss
     * @parameter {Boolean} true or false
     */
    https: false,
    /*
     * isMultiLoginSessions
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    isMultiLoginSessions: false,
    /*
     * set presence after login
     */
    isAutoLogin: true,
    /**
     * Whether to use window.doQuery()
     * @parameter {Boolean} true or false
     */
    isWindowSDK: false,
    /**
     * isSandBox=true:  xmppURL: 'im-api-sandbox.easemob.com',  apiURL: '//a1-sdb.easemob.com',
     * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
     * @parameter {Boolean} true or false
     */
    isSandBox: false,
    /**
     * Whether to console.log in strophe.log()
     * @parameter {Boolean} true or false
     */
    isDebug: true,
    /**
     * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
     * won't auto connect if autoReconnectNumMax=0.
     */
    autoReconnectNumMax: 2,
    /**
     * the interval seconds between each auto reconnectting.
     * works only if autoReconnectMaxNum >= 2.
     */
    autoReconnectInterval: 2,
    /**
     * webrtc supports WebKit and https only
     */
    isWebRTC: (/Firefox/.test(navigator.userAgent) || /WebKit/.test(navigator.userAgent)) && /^https:$/.test(window.location.protocol),
    /**
     * after login, send empty message to xmpp server like heartBeat every 45s, to keep the ws connection alive.
     */
    heartBeatWait: 4500,
    /**
     * while http access,use ip directly,instead of ServerName,avoiding DNS problem.
     */
    isHttpDNS: false,

    /**
     * Will show the status of messages in single chat
     * msgStatus: true  show
     * msgStatus: true  hide
     */
    msgStatus: true,

    /**
     * When a message arrived, the receiver send an ack message to the
     * sender, in order to tell the sender the message has delivered.
     * See call back function onReceivedMessage
     */
    delivery: true,

    /**
     * When a message read, the receiver send an ack message to the
     * sender, in order to tell the sender the message has been read.
     * See call back function onReadMessage
     */
    read: false,

    /**
     * Will encrypt text message and emoji message
     * {type:'none'}   no encrypt
     * {type:'base64'} encrypt with base64
     * {type:'aes',mode: 'ebc',key: '123456789easemob',iv: '0000000000000000'} encrypt with aes(ebc)
     * {type:'aes',mode: 'cbc',key: '123456789easemob',iv: '0000000000000000'} encrypt with aes(cbc)
     */
    encrypt: {
        type: 'none'
    }
}
WebIM.Emoji = {
    path: 'images/faces/',
    map: {
        '[):]': 'ee_1.png',
        '[:D]': 'ee_2.png',
        '[;)]': 'ee_3.png',
        '[:-o]': 'ee_4.png',
        '[:p]': 'ee_5.png',
        '[(H)]': 'ee_6.png',
        '[:@]': 'ee_7.png',
        '[:s]': 'ee_8.png',
        '[:$]': 'ee_9.png',
        '[:(]': 'ee_10.png',
        '[:\'(]': 'ee_11.png',
        '[:|]': 'ee_12.png',
        '[(a)]': 'ee_13.png',
        '[8o|]': 'ee_14.png',
        '[|]': 'ee_15.png',
        '[+o(]': 'ee_16.png',
        '[<o)]': 'ee_17.png',
        '[|-)]': 'ee_18.png',
        '[*-)]': 'ee_19.png',
        '[:-#]': 'ee_20.png',
        '[:-*]': 'ee_21.png',
        '[^o)]': 'ee_22.png',
        '[8-)]': 'ee_23.png',
        '[(|)]': 'ee_24.png',
        '[(u)]': 'ee_25.png',
        '[(S)]': 'ee_26.png',
        '[(*)]': 'ee_27.png',
        '[(#)]': 'ee_28.png',
        '[(R)]': 'ee_29.png',
        '[({)]': 'ee_30.png',
        '[(})]': 'ee_31.png',
        '[(k)]': 'ee_32.png',
        '[(F)]': 'ee_33.png',
        '[(W)]': 'ee_34.png',
        '[(D)]': 'ee_35.png'
    }
}
WebIM.NewEmoji = {
    map: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😵', '🤯', '🤠', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹', '😮', '😯', '😲', '😳', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '💋', '👋', '🤚', '🖐', '✋', '🖖', '👌', '✌', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍', '💅', '🤳', '💪', '👂', '👃', '🧠', '👀', '👁', '👅', '👄', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👱‍', '👨‍', '👨‍', '👨‍', '👨‍', '👩', '👱‍', '👩‍', '👩‍', '👩‍', '👩‍', '🧓', '👴', '👵', '🙍', '🙍‍', '🙍‍', '🙎', '🙎‍', '🙎‍', '🙅', '🙅‍', '🙅‍', '🙆', '🙆‍', '🙆‍', '💁', '💁‍', '💁‍', '🙋', '🙋‍', '🙋‍', '🙇', '🙇‍', '🙇‍', '🤦', '🤦‍', '🤦‍', '🤷', '🤷‍', '🤷‍', '👨‍⚕️', '👩‍⚕️', '👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫', '👨‍⚖️', '👩‍⚖️', '👨‍🌾', '👩‍🌾', '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧', '👨‍🏭', '👩‍🏭', '👨‍💼', '👩‍💼', '👨‍🔬', '👩‍🔬', '👨‍💻', '👩‍💻', '👨‍🎤', '👩‍🎤', '👨‍🎨', '👩‍🎨', '👨‍✈️', '👩‍✈️', '👨‍🚀', '👩‍🚀', '👨‍🚒', '👩‍🚒', '👮', '👮‍♂️', '👮‍♀️', '🕵Det', '🕵️‍♂️', '🕵️‍♀️', '💂', '💂‍', '💂‍', '👷', '👷‍', '👷‍', '🤴', '👸', '👳', '👳‍', '👳‍', '👲', '🧕', '🤵', '👰', '🤰', '🤱', '👼', '🎅', '🤶', '🧙', '🧙‍', '🧙‍', '🧚', '🧚‍', '🧚‍', '🧛', '🧛‍', '🧛‍', '🧜', '🧜‍', '🧜‍', '🧝', '🧝‍', '🧝‍', '🧞', '🧞‍', '🧞‍', '🧟', '🧟‍', '🧟‍', '💆', '💆‍', '💆‍', '💇', '💇‍', '💇‍', '🚶', '🚶‍', '🚶‍', '🏃', '🏃‍', '🏃‍', '💃', '🕺', '🕴', '👯', '👯‍', '👯‍', '🧖', '🧖‍', '🧖‍', '🧘', '👭', '👫', '👬', '💏', '👨‍', '👩‍', '💑', '👨‍', '👩‍', '👪', '👨‍👩‍👦', '👨‍👩‍👧', '👨‍👩‍👧‍👦', '👨‍👩‍👦‍👦', '👨‍👩‍👧‍👧', '👨‍👨‍👦', '👨‍👨‍👧', '👨‍👨‍👧‍👦', '👨‍👨‍👦‍👦', '👨‍👨‍👧‍👧', '👩‍👩‍👦', '👩‍👩‍👧', '👩‍👩‍👧‍👦', '👩‍👩‍👦‍👦', '👩‍👩‍👧‍👧', '👨‍👦', '👨‍👦‍👦', '👨‍👧', '👨‍👧‍👦', '👨‍👧‍👧', '👩‍👦', '👩‍👦‍👦', '👩‍👧', '👩‍👧‍👦', '👩‍👧‍👧', '🗣', '👤', '👥', '👣', '🌂', '☂', '👓', '🕶', '👔', '👕', '👖', '🧣', '🧤', '🧥', '🧦', '👗', '👘', '👙', '👚', '👛', '👜', '👝', '🎒', '👞', '👟', '👠', '👡', '👢', '👑', '👒', '🎩', '🎓', '🧢', '⛑', '💄', '💍', '💼']
}
/* eslint new-cap: ["error", { "newIsCap": false }] */
const conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true
})
conn.listen({
    // 连接成功回调
    onOpened: function (message) {
        conn.getRoster({
            success: function (roster) {
                let rosData = []
                for (var i = 0, l = roster.length; i < l; i++) {
                    if (roster[i].subscription === 'both') {
                        rosData.push(roster[i])
                        console.log(rosData)
                        // store.dispatch('getFriendsData', rosData)
                    } else {
                        return
                    }
                }
            }
        })
    },
    // 收到文本消息
    onTextMessage: function (message) {
    },
    // 收到表情信息
    onEmojiMessage: function (message) {
    },
    // 收到联系人订阅请求、处理群组、聊天室被踢解散等消息
    onPresence: function (message) {
    },
    // 处理好友申请
    onRoster: function () {
        conn.getRoster({
            success: function (roster) {
                let rosData = []
                for (var i = 0, l = roster.length; i < l; i++) {
                    if (roster[i].subscription === 'both') {
                        rosData.push(roster[i])
                        console.log('处理好友申请')
                        console.log(rosData)
                        // store.dispatch('getFriendsData', rosData)
                    } else {
                        return
                    }
                }
            }
        })
    },
    onAudioMessage: function (message) { console.log('当前关闭') }, // 收到音频消息
    onLocationMessage: function (message) { console.log('当前关闭') }, // 收到位置消息
    onFileMessage: function (message) { console.log('当前关闭') }, // 收到文件消息
    onVideoMessage: function (message) { console.log('当前关闭') }, // 收到视频消息
    onInviteMessage: function (message) { console.log('当前关闭') }, // 处理群组邀请
    onOnline: function () { console.log('当前关闭') }, // 本机网络连接成功
    onOffline: function () { console.log('当前关闭') }, // 本机网络掉线
    // 失败回调
    onError: function (message) {
        console.log(message)
    }
})

// const rtcCall = new WebIM.WebRTC.Call({
//   connection: conn,
//   mediaStreamConstaints: {
//     audio: true,
//     video: true
//   },

//   listener: {
//     onAcceptCall: function (from, options) {
//       // console.log('onAcceptCall::', 'from: ', from, 'options: ', options);
//     },
//     onGotRemoteStream: function (stream, streamType) {
//       // console.log('onGotRemoteStream::', 'stream: ', stream, 'streamType: ', streamType);
//     },
//     onGotLocalStream: function (stream, streamType) {
//       // console.log('onGotLocalStream::', 'stream:', stream, 'streamType: ', streamType);
//     },
//     onRinging: function (caller) {
//       let reg = /(?<=_).*(?=@)/
//       let callerId = (reg.exec(caller))[0]
//       let curUser = []
//       let friends = store.state.data.friends
//       for (let i in friends) {
//         if (friends[i].username === callerId) {
//           curUser = friends[i]
//         }
//       }
//       console.log(curUser)
//       // router.push({ path: '/calling', query: { user: curUser, curBtn: true } })
//     },
//     onTermCall: function (reason) {
//       console.log('onTermCall::')
//       console.log('reason:', reason)
//     },
//     onIceConnectionStateChange: function (iceState) {
//       if (iceState === 'closed') {
//         // router.push({ path: '/friends' })
//       }
//     },
//     onError: function (e) {
//       console.log(e)
//     }
//   }
// })

// 需要注册一个全局的WebIM 在hx-sdk中有需要用到 不然发送接收表情时会抛出异常
window.WebIM = WebIM

export default {
    install: function (Vue, options) {
        // console.log(WebIM)
        Object.defineProperty(Vue.prototype, '$imConn', { value: conn })
        // Object.defineProperty(Vue.prototype, '$rtcCall', { value: rtcCall })
    }
}