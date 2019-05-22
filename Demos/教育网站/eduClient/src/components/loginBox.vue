<template>
	<div class="login-box">
		<div v-if="!cloginState">
			<div class="login-box-title">
				<div class="login-title-cell">
					<div :class="{'login-title-active':(active=='person')}" @click="changeID('person')">学员登录</div>
				</div>
				<div class="login-title-cell">
					<div :class="{'login-title-active':(active=='company')}" @click="changeID('company')">单位登录</div>
				</div>
				<div class="clear-fix"></div>
			</div>
			<div class="login-box-body">
				<div class="login-input-cell">
					<input type="text" class="login-input login-input-fill" placeholder="请输入手机号" v-model="username"/>
				</div>
				<div class="login-input-cell">
					<input type="password" class="login-input login-input-fill" placeholder="请输入密码" v-model="password"/>
				</div>
				<div class="login-input-cell">
					<input type="text" class="login-input pull-left" placeholder="请输入验证码" v-model="vcode"/>
					<img @click="changeImg()" class="login-vimg pull-right" :src="vImg" />
					<div class="clear-fix"></div>
				</div>
				<div class="login-input-cell">
					<button class="login-btn" @click="login()">登录</button>
				</div>
				<div class="login-input-cell login-tools">
					<!--<div class="pull-left login-wechat">
						<img class="wechat-icon" src="../assets/images/wechat.png"/>
						<span class="wechat-title">微信登录</span>
					</div>-->
					<div class="pull-left login-rigester" @click="jumpToRegister()">注册</div>
					<router-link to="/resetPassword">
						<div class="pull-right login-rigester">忘记密码？</div>
					</router-link>
				</div>
			</div>
		</div>
		<div v-if="cloginState">
			<div class="user-info">
				<div class="head-img">
					<img src="../assets/images/userHead.png" />
				</div>
				<div class="head-name">Hi,{{cloginUser}}</div>
			</div>
			<div class="login-message">您已成功登录继续教育在线学习中心</div>
			<div class="user-box">
				<div v-if="ctype=='person'">
					<div class="cell">
						<div>
							<router-link :to="{path:'/personCenter',query:{show:'我的班级'}}"><div class="btn">学员中心</div></router-link>
						</div>
						<div>
							<router-link to="/applyClass"><div class="btn">报名培训</div></router-link>
						</div>
					</div>
					<div class="cell">
						<div>
							<!--<router-link to="/"><div class="btn">个人设置</div></router-link>-->
							<router-link to="/personBaseInfo"><div class="btn">个人设置</div></router-link>
						</div>
						<div>
							<router-link to="/personCenter?show=我的订单"><div class="btn">我的订单</div></router-link>
						</div>
					</div>
					<div class="cell">
						<div>
							<router-link to="/personCenter?show=培训证明"><div class="btn">培训证明</div></router-link>
						</div>
						<div>
							<button class="btn" @click="logout()">退出登录</button>
						</div>
					</div>
				</div>
				<div v-if="ctype=='company'">
					<div class="cell">
						<div>
							<router-link to="/applyClassC"><div class="btn">报名培训</div></router-link>
						</div>
						<div>
							<router-link to="/companyCenter?show=我的订单"><div class="btn">我的订单</div></router-link>
						</div>
					</div>
					<div class="cell">
						<div>
							<router-link to="/companyBaseInfo"><div class="btn">信息设置</div></router-link>
						</div>
						<div>
							<button class="btn" @click="logout()">退出登录</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<alertBoard ref="alertBoard"/>
	</div>
</template>

<script>
import alertBoard from '@/components/alertBoard'
import axios from 'axios'
import {commonJs} from '@/util/commonJs'
export default{
	name: 'loginBox',
	components:{
		alertBoard
	},
	data: function(){
		return {
			vImg:'/api/users/imagecode/png/120/30/25',
			active: 'person',
			username: '',
			password: '',
			vcode: ''
		}
	},
	computed:{
		cloginState: function(){
			return this.$store.state.loginState.state;
		},
		ctype: function(){
			return this.$store.state.loginState.type;
		},
		cloginUser: function(){
			return this.$store.state.loginState.name;
		}
	},
	methods: {
		changeImg: function(){
			this.vImg += '?';
		},
		changeID: function(type){
			this.active = type;
		},
		jumpToRegister: function(){
			if(this.active=='person'){
				this.$router.push({path:('/registerPerson')});
			}else{
				this.$router.push({path:('/registerCompany')});
			}
		},
		logout: function(){
			commonJs.logout(this);
		},
		login: function(){
			let self = this;
			var url = '';
			if(self.active=='person'){
				url = '/api/users/token';
			}else{
				url = '/api/users/enterprise/token';
			}
			axios.get(url,{
				params:{
					phone: self.username,
					password: self.password,
					imgCode: self.vcode
				}
			}).then(function(response){
				if(response.data.meta.code==200){
					axios.get('/api/users/loginuser').then(function(res){
						if(res.data.meta.code==200){
							let status = {
								state:true,
								phone:self.username,
								type:self.active,
								identification: res.data.body.loginUserInfo.identification,
								name: res.data.body.loginUserInfo.name
							};
							self.$store.commit('setUserLoginInfo',status);
						}else{
							self.$refs.alertBoard.showModal(res.data.meta.message);
						}
					});
				}else{
					self.$refs.alertBoard.showModal(response.data.meta.message);
				}
			});
		}
	},
	mounted: function(){
		this.changeImg();
	}
}
</script>

<style scoped>
	.login-box{
		width: 100%;
		height: 308px;
	}
	.login-title-cell{
		font-size: 16px;
		font-weight: bold;
		float: left;
		margin-right: 10%;
		cursor: pointer;
	}
	.login-title-active{
		padding-bottom: 5px;
		border-bottom: 2px #1D82D2 solid;
	}
	.login-input-cell{
		margin:22px 0px;
	}
	.login-input{
		height: 36px;
		border-radius: 6px;
		border: none;
		padding: 0px 4.26%;
		width: 50%;
		border: 1px solid #1D82D2;
	}
	.login-input-fill{
		width: 91.48%;
	}
	.login-vimg{
		width: 35%;
		height: 36px;
		border-radius: 6px;
	}
	.login-btn{
		color: #fff;
		background-color: #1D82D2;
		height: 36px;
		width: 100%;
		border: none;
		border-radius: 6px;
		font-size: 18px;
	}
	.wechat-icon{
		width:20px;
		height: 16px;
	}
	.wechat-title{
		font-size: 14px;
		font-weight: bold;
	}
	.login-rigester{
		font-size: 14px;
		font-weight: bold;
		color: #1D82D2;
		cursor: pointer;
	}
	.login-tools{
		vertical-align: middle;
	}
	.login-wechat{
		cursor: pointer;
	}
	.user-info{
		display: table;
	}
	.user-info .head-img{
		display: table-cell;
		vertical-align: middle;
	}
	.user-info .head-img img{
		width:56px;
		height: 56px;
	}
	.user-info .head-name{
		display: table-cell;
		vertical-align: middle;
		padding-left: 15px;
		font-size:18px;
		font-weight:bold;
	}
	.login-message{
		height: 30px;
		font-size: 12px;
		text-align: center;
		font-weight: bold;
		margin-top: 20px;
	}
	.user-box{
		margin-top: 14px;
	}
	.user-box .cell{
		margin-top: 25px;
	}
	.user-box .cell div{
		width: 48%;
		display: inline-block;
		text-align: center;
	}
	.user-box .cell div a{
		text-decoration: none;
		text-align: center;
		line-height: 36px;
	}
	.user-box .cell .btn{
		background-color: #1D82D2;
		font-size: 14px;
		color: #FFF;
		height: 36px;
		border: none;
		border-radius: 6px;
		width: 90px;
		cursor: pointer;
	}
</style>