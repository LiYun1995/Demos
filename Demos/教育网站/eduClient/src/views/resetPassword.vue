<template>
	<div class="main-box register-person">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>首页>></span>
			</span>
			<span>重置密码</span>
		</div>
		<div class="tool-bar">
			<div class="active company">重置密码</div>
		</div>
		<div class="list" style="margin-top: 20px;">
			<div class="cell">
				<div class="name">手机号码：</div>
				<div class="content">
					<input class="full" v-model="phone" type="text" placeholder="请输入要绑定的手机号码"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">请输入短信码：</div>
				<div class="content">
					<input class="half" v-model="smsCode" placeholder="手机验证码" type="text"/>
					<button class="half-small" :disabled="!smsState" @click="sendCode()">{{smsState?'获取短信验证码':(smsTime+' 秒')}}</button>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">新密码：</div>
				<div class="content">
					<input class="full" v-model="newpass" placeholder="请输入新密码" type="password"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">确认新密码：</div>
				<div class="content">
					<input class="full" v-model="reqpass" placeholder="请再次输入新密码" type="password"/>
				</div>
				<div class="important">*</div>
			</div>
			<div>
				<input class="submit submit-active" @click="changePhone()" type="button" value="确认修改" />
			</div>
		</div>
		<alertBoard ref="alertBoard"/>
	</div>
</template>

<script>
import {commonJs} from '@/util/commonJs'
import alertBoard from '@/components/alertBoard'
import axios from 'axios'
export default{
	name: 'personBaseInfo',
	components:{
		alertBoard
	},
	created:function(){
		this.$store.state.activeMenu = 'index';
	},
	data: function(){
		return {
			phone:'',
			smsCode:'',
			smsState:true,
			smsTime:300,
			smsHandl: null,
			newpass:'',
			reqpass:''
		}
	},
	mounted:function(){
		this.$store.commit('checkFooter');
	},
	methods:{
		changePhone:function(){
			let self = this;
			if(!self.phone){
				self.showAlert('请输入手机号码');
				return false;
			}
			if(self.phone.length!=11||self.phone.search(/[0-9]{11}/i)!==0){
				self.showAlert('请输入正确的手机号码');
				return false;
			}
			if(!self.smsCode){
				self.showAlert('请输入手机短信验证码');
				return false;
			}
			if(!self.newpass){
				self.showAlert('请输入新密码');
				return false;
			}
			if(!self.reqpass){
				self.showAlert('请确认新密码');
				return false;
			}
			if(self.reqpass!=self.newpass){
				self.showAlert('两次输入密码不一致');
				return false;
			}
			axios({
				url:'/api/users/passwords/reset',
				params:{
					phone:self.phone,
					newPassword:self.reqpass,
					sms:self.smsCode
				},
				method:'POST'
			}).then(function(response){
				if(response.data.meta.code==200){
					self.showAlert('重置成功');
				}else{
					self.showAlert(response.data.meta.message);
				}
			});;
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
	.register-person{
		padding-bottom: 60px;
	}
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
	.register-person .type{
		display: table;
		margin: 21px 35px;
		font-size: 18px;
		color:#1D82D2;
		font-weight:bold;
	}
	.register-person .type img{
		width: 24px;
		height: 24px;
		margin-right: 5px;
	}
	.register-person .type img,.register-person .type div{
		display: table-cell;
		vertical-align: middle;
	}
	.register-person .message-alert{
		color:#FE9B00;
		font-size: 14px;
		margin: 20px 30px;
	}
	.register-person .list{
	}
	.register-person .list .name{
		font-size: 18px;
		text-align: right;
		width: 300px;
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
		margin-left: 160px;
	}
	.register-person .rule a{
		color: #1681D3;
		text-decoration: none;
	}
	.register-person .rule{
		padding-left: 140px;
		font-size: 18px;
		margin-top: 30px;
	}
	.register-person .submit{
		cursor: pointer;
		font-size: 18px;
		background-color: #9B9B9B;
		color:#FFF;
		width: 425px;
		height: 44px;
		border: none;
		margin: 10px 0px 24px 300px;
	}
	.register-person .submit-active{
		background-color: #1681D3;
	}
	.yyzz{
		position: absolute;
	}
	.sfz{
		position: absolute;
		width: 200px;
	}
</style>