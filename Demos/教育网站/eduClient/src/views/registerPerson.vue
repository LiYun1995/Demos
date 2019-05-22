<template>
	<div class="main-box register-person">
		<alertBoard ref="alertBoard"/>
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>首页>></span>
			</span>
			<span>用户注册</span>
		</div>
		<div class="tool-bar">
			<div class="active person">用户注册</div>
			<router-link to="/registerCompany"><div class="company">单位注册</div></router-link>
			<div class="pull-right login">
				<span>已有账号，</span>
				<router-link to="/">点击登录</router-link>
			</div>
		</div>
		<div class="message-alert">{{messageAlert}}</div>
		<div class="list">
			<div class="cell">
				<div class="name">姓名：</div>
				<div class="content">
					<input v-model="name" class="full" placeholder="请输入您的真实姓名" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">身份证号码：</div>
				<div class="content">
					<input v-model="idCard" class="full" placeholder="请输入您的18位身份证号码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">手机号码：</div>
				<div class="content">
					<input v-model="phone" class="full" placeholder="请输入您的11位手机号码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<!--<div class="cell">
				<div class="name">身份证头像面：</div>
				<div class="content">
					<input class="half" type="file"/>
					<button @mouseenter="showSFZ(true)" @mouseleave="showSFZ(false)" class="half-small">查看示例照片</button>
				</div>
				<div class="important">*</div>
				<img class="sfz" v-show="SFZ" src="../assets/images/shenfenzheng.jpg" />
			</div>-->
			<div class="cell">
				<div class="name">请输入短信码：</div>
				<div class="content">
					<input v-model="phoneCode" class="half" placeholder="手机验证码" type="text"/>
					<button class="half-small" :disabled="!smsState" @click="sendCode()">{{smsState?'获取短信验证码':(smsTime+' 秒')}}</button>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">密码：</div>
				<div class="content">
					<input v-model="password" class="full" placeholder="请输入8-20位长度的密码" type="password"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">确认密码：</div>
				<div class="content">
					<input v-model="reqPass" class="full" placeholder="请再次输入密码" type="password"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">请输入图形码：</div>
				<div class="content">
					<input v-model="vcode" class="half" placeholder="请输入验证码" type="text"/>
					<img class="half-small" @click="changeImg()" :src="vcodeImg" />
				</div>
				<div class="important">*</div>
			</div>
			<div class="clear-fix"></div>
			<div class="rule">
				<input v-model="rule" type="checkbox" />我已阅读<router-link to="/rule">《巴蜀继续教育在线学习中心平台注册协议》</router-link>
			</div>
			<div>
				<input class="submit" @click="register()" type="button" value="提交" />
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import alertBoard from '@/components/alertBoard'
export default{
	name: 'registerPerson',
	components:{
		alertBoard
	},
	data: function(){
		return {
			name:'',
			idCard:'',
			phone:'',
			vcode:'',
			password:'',
			reqPass:'',
			rule:'',
			phoneCode:'',
			vcodeImg: '/api/users/imagecode/png/300/30/25',
			SFZ: false,
			messageAlert: '温馨提示：请输入您本人的真实信息，以下信息将会作为您培训证明认证及管理请仔细核对，确保输入正确',
			smsState:true,
			smsTime:300,
			smsHandl: null
		}
	},
	created:function(){
		this.$store.state.activeMenu = 'index';
	},
	mounted:function(){
		this.$store.commit('checkFooter');
	},
	methods:{
		showSFZ: function(state){
			this.SFZ = state;
		},
		register: function(){
			if(!this.name){
				this.showAlert('请填写姓名');
				return false;
			}
			if(!this.idCard||this.idCard.length!=18){
				this.showAlert('请填写正确的身份证号');
				return false;
			}
			if(!this.phone||this.phone.length!=11){
				this.showAlert('请填写正确的手机号码');
				return false;
			}
			if(!this.vcode){
				this.showAlert('请填写验证码');
				return false;
			}
			if(!this.phoneCode){
				this.showAlert('请填写短信码');
				return false;
			}
			if(!this.password||this.password.length<8||this.password.length>20){
				this.showAlert('请填写正确格式的密码');
				return false;
			}
			if(!this.reqPass){
				this.showAlert('请确认密码');
				return false;
			}
			if(this.reqPass!=this.password){
				this.showAlert('两次输入密码不一致');
				return false;
			}
			if(!this.rule){
				this.showAlert('请先阅读《巴蜀继续教育在线学习中心平台注册协议》');
				return false;
			}
			let self = this;
			axios.post('/api/users',{
				"identification": self.idCard,
				"imgValidataCode": self.vcode,
				"name": self.name,
				"password": self.reqPass,
				"phone": self.phone,
				"smsValidataCode": self.phoneCode
			}).then(function(response){
				if(response.data.meta.code==200){
					self.showAlert('注册成功，请在首页登录');
					setTimeout(function(){
						self.$refs.alertBoard.modalBordState = false;
						self.$router.push({path:'/'});
					},1000);
				}else{
					self.showAlert(response.data.meta.message);
				}
			});
		},
		changeImg: function(){
			this.vcodeImg += '?';
		},
		sendCode: function(){
			let self = this;
			if(!self.phone||self.phone.length!=11){
				self.showAlert('请填写正确的手机号码');
				return false;
			}
			axios.get('/api/users/phone/validatacode',{
				params:{
					phone:self.phone
				}
			}).then(function(response){
				if(response.data.meta.code==200){
					self.showAlert('发送成功');
					self.smsState = false;
					self.smsTime = 300;
					self.smsHandl = setInterval(function(){
						--self.smsTime;
						if(!self.smsTime){
							clearInterval(self.smsHandl);
							self.smsState = true;
						}
					},1000);
				}else{
					self.showAlert(response.data.meta.message);
				}
			});
		},
		showAlert: function(message){
			this.$refs.alertBoard.showModal(message);
		}
	}
}
</script>

<style scoped>
	.register-person .top{
		display: table;
		font-size:14px;
		height:20px;
	}
	.register-person .top img{
		width:18px;
		height:20px;
		margin-right: 12px;
	}
	.register-person .top span{
		display: table-cell;
		vertical-align: middle;
	}
	.register-person .top .back{
		color: #1D82D2;
	}
	.register-person .tool-bar{
		line-height: 52px;
		border-bottom: 1px #CCCCCC solid;
	}
	.register-person .tool-bar .person,.register-person .tool-bar .company{
		font-size: 22px;
		font-weight: bold;
		width: 150px;
		text-align: center;
	}
	.register-person .tool-bar .active{
		border-bottom: 4px #1D82D2 solid;
		color: #1D82D2;
	}
	.register-person .tool-bar a{
		color: #000;
	}
	.register-person .tool-bar div{
		display: inline-block;
	}
	.register-person .tool-bar .login{
		font-size: 18px;
		font-weight: bold;
	}
	.register-person .tool-bar .login a{
		text-decoration: none;
		color: #1681D3;
	}
	.register-person .message-alert{
		color:#FE9B00;
		font-size: 14px;
		margin: 20px 30px;
	}
	.register-person .list .name{
		font-size: 18px;
		text-align: right;
		width: 140px;
	}
	.register-person .list .cell{
		margin: 20px 0px;
		display: table;
	}
	.register-person .list .cell div{
		display: table-cell;
		vertical-align: middle;
	}
	.register-person .list .cell input{
		height: 40px;
		padding-left: 19px;
		font-size: 18px;
		vertical-align: middle;
	}
	.register-person .list .cell button{
		color: #FFF;
		background-color: #1681D3;
		border: none;
	}
	.register-person .list .cell .full{
		width: 400px;
	}
	.register-person .list .cell .half{
		width: 210px;
	}
	.register-person .list .cell .half-small{
		margin-left: 11px;
		width: 175px;
		height: 44px;
		vertical-align: middle;
	}
	.register-person .list .cell .important{
		font-size: 24px;
		color:#BA2A17;
		display: table-cell;
		vertical-align: middle;
		padding-left: 5px;
	}
	.register-person .rule input{
		width: 18px;
		height: 18px;
	}
	.register-person .rule a{
		color: #1681D3;
		text-decoration: none;
	}
	.register-person .rule{
		padding-left: 140px;
		font-size: 18px;
	}
	.register-person .submit{
		cursor: pointer;
		font-size: 18px;
		background-color: #1681D3;
		color:#FFF;
		width: 425px;
		height: 44px;
		border: none;
		margin: 65px 0px 84px 140px;
	}
	.register-person .submit-active{
		background-color: #1681D3;
	}
	.sfz{
		position: absolute;
		width: 200px;
	}
</style>