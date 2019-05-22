<template>
	<div class="main-box register-person">
		<alertBoard ref="alertBoard"/>
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>信息设置>></span>
			</span>
			<span>修改密码</span>
		</div>
		<div class="tool-bar">
			 <router-link to="/companyBaseInfo"><div class="company">基础信息</div></router-link>
           	 <div class="active person">修改密码</div>
		</div>
		<div class="message-alert"></div>
		<div class="list">
			<div class="cell">
				<div class="name">当前密码：</div>
				<div class="content">
					<input class="full" placeholder="请输入当前密码" type="password" v-model="oldpass"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">新密码：</div>
				<div class="content">
					<input class="full" placeholder="请输入新密码" type="password" v-model="newpass"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">确认密码：</div>
				<div class="content">
					<input class="full" placeholder="请再次输入新密码" type="password" v-model="reqpass"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="clear-fix"></div>
		</div>
		<div>
			<input class="submit submit-active" type="button" value="保存" @click="changePassword()"/>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import alertBoard from '@/components/alertBoard'
import {commonJs} from '@/util/commonJs'
export default{
	name: 'personChangePassword',
	components:{
		alertBoard
	},
	data: function(){
		return {
			oldpass: '',
			newpass: '',
			reqpass: ''
		}
	},
	mounted:function(){
		this.$store.commit('checkFooter');
		commonJs.checkPremission(this,'company');
	},
	methods:{
		changePassword: function(){
			if(!this.oldpass||this.oldpass.length<8||this.oldpass.length>20){
				this.showAlert('请输入8-20位的当前密码');
				return false;
			}
			if(!this.newpass||this.newpass.length<8||this.newpass.length>20){
				this.showAlert('请输入8-20位的新密码');
				return false;
			}
			if(!this.reqpass){
				this.showAlert('请再次输入新密码');
				return false;
			}
			if(this.newpass!=this.reqpass){
				this.showAlert('两次输入的密码不一致');
				return false;
			}
			let self = this;
			axios({
				method: 'POST',
				url: '/api/users/password',
				params: {
					oldPassword:self.oldpass,
					newPassword:self.reqpass
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response){
				if(response.data.meta.code==200){
					self.showAlert('修改成功');
				}else{
					self.showAlert(response.data.meta.message);
				}
			});
		},
		showAlert: function(message){
			this.$refs.alertBoard.showModal(message);
		}
	},
	created:function(){
		this.$store.state.activeMenu = 'noActive';
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
		margin: 35px 0px 84px 300px;
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