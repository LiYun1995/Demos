import Vue from 'vue';
import Vuex from 'vuex'; 
Vue.use(Vuex); 

export default new Vuex.Store({
	state: {
		shortFooter: true,
		messageBoard: false,
		loginState: {
			state: false,
			identification: '',
			name: '',
			phone: '',
			type: ''
		},
		resourceDomain:'http://cname.bashujiaoyu.com/',
		activeMenu:'index'
	},
	mutations: {
		checkFooter: function(state){
			//增加一点延时，保证稳定性
			setTimeout(function(){
				if(state.shortFooter){
					state.shortFooter = window.innerHeight > document.body.clientHeight + 194;
				}else{
					state.shortFooter = window.innerHeight > document.body.clientHeight;
				}
			},10);
		},
		showMessageBoard: function(state,status){
			state.messageBoard = status;
		},
		setUserLoginInfo: function(state,loginStatus){
			state.loginState.state = loginStatus.state;
			state.loginState.identification = loginStatus.identification;
			state.loginState.name = loginStatus.name;
			state.loginState.phone = loginStatus.phone;
			state.loginState.type = loginStatus.type;
			
			function setCookie(name,value){
				var exp = new Date();
				exp.setTime(exp.getTime() + 3*60*60*1000);
				document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
			}
			setCookie('ustate',loginStatus.state);
			setCookie('uidentification',loginStatus.identification);
			setCookie('uname',loginStatus.name);
			setCookie('uphone',loginStatus.phone);
			setCookie('utype',loginStatus.type);
		},
		checkUserLogin: function(state){
			function getCookie(name){
				var arr = null;
				var reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
				if(arr = document.cookie.match(reg)){
					return unescape(arr[2]);
				}else{
					return null;
				}
			}
			state.loginState.state = getCookie('ustate')==='true' ? true : false;
			state.loginState.identification = getCookie('uidentification');
			state.loginState.name = getCookie('uname');
			state.loginState.phone = getCookie('uphone');
			//state.loginState.type = 'company';//getCookie('utype');
			state.loginState.type = getCookie('utype');
		}
	}
});