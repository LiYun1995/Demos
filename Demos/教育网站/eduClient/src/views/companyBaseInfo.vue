<template>
	<div class="main-box register-person">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>信息设置>></span>
			</span>
			<span>基础信息</span>
		</div>
		<div class="tool-bar">
			<div class="active company">基础信息</div>
			<router-link to="/companyChangePassword"><div class="person">修改密码</div></router-link>
		</div>
		<div class="message-alert"></div>
		<!--<div class="list">
			<div class="type">
				<img class="type-icon" src="../assets/images/registerCompany.png"/>
				<div>单位信息</div>
			</div>
			
			<div class="cell">
				<div class="name">单位名称：</div>
				<div class="content">
					<input class="full" placeholder="请输入您的真实姓名" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">所在地区：</div>
				<div class="content">
					<select class="half-t">
						<option>213</option>
					</select>
					<select class="half-t">
						<option>213</option>
					</select>
					<select class="half-t">
						<option>213</option>
					</select>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">单位详细地址：</div>
				<div class="content">
					<input class="full" placeholder="请输入您的18位身份证号码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">组织机构代码统一社会信用代码：</div>
				<div class="content">
					<input class="full" placeholder="请输入您的11位手机号码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">营业执照原件照片：</div>
				<div class="content">
					<input class="half" type="file"/>
					<button @mouseenter="showYYZZ(true)" @mouseleave="showYYZZ(false)" class="half-small">查看示例照片</button>
				</div>
				<div class="important">*</div>
				<img class="yyzz" v-show="YYZZ" src="../assets/images/yingyezhizhao.png" />
			</div>
			<div>
				<input class="submit submit-active" type="button" value="保存" />
			</div>
			<div class="clear-fix"></div>
		</div>-->
		<div class="list" v-if="changeAdmin" style="margin-top: 20px;">
			<div class="type">
				<img class="type-icon" src="../assets/images/registerPerson.png"/>
				<div>管理员信息</div>
			</div>
			<div class="cell">
				<div class="name">姓名：</div>
				<div class="content">
					<input class="full" v-model="cAdminName" placeholder="请输入管理员姓名" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">手机号码：</div>
				<div class="content">
					<input class="full" v-model="cAdminPhone" value="" placeholder="请输入管理员手机号码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">身份证头像面：</div>
				<div class="content">
					<form id="sfzForm" enctype="multipart/form-data" action="http://upload.qiniup.com/">
						<input id="sfzKey" name="key" type="hidden" value=""/>
						<input name="accept" type="hidden" value="text/html"/>
						<input id="sfzToken" name="token" type="hidden" value=""/>
						<input id="sfzFile" name="file" class="half" accept="image/png,image/gif,image/jpeg" type="file" @change="uploadSFZ"/>
						<button type="button" @mouseenter="showSFZ(true)" @mouseleave="showSFZ(false)" class="half-small">查看示例照片</button>
					</form>
				</div>
				<div class="important">*</div>
				<img class="sfz" v-show="SFZ" src="../assets/images/shenfenzheng.jpg" />
			</div>
			<div class="cell">
				<div class="name">身份证国徽面：</div>
				<div class="content">
					<form id="sfzbForm" enctype="multipart/form-data" action="http://upload.qiniup.com/">
						<input id="sfzbKey" name="key" type="hidden" value=""/>
						<input name="accept" type="hidden" value="text/html"/>
						<input id="sfzbToken" name="token" type="hidden" value=""/>
						<input id="sfzbFile" name="file" class="half" accept="image/png,image/gif,image/jpeg" type="file" @change="uploadSFZB"/>
						<button type="button" @mouseenter="showSFZB(true)" @mouseleave="showSFZB(false)" class="half-small">查看示例照片</button>
					</form>
				</div>
				<div class="important">*</div>
				<img class="sfz" v-show="SFZB" src="../assets/images/shenfenzhengb.jpg" />
			</div>
			<div class="cell">
				<div class="name">身份证号码：</div>
				<div class="content">
					<input class="full" v-model="cAdminId" placeholder="请输入管理员身份证号码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">登录密码：</div>
				<div class="content">
					<input class="full" v-model="cAdminPass" placeholder="请输入登录密码" type="password"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">确认密码：</div>
				<div class="content">
					<input class="full" v-model="cAdminPassReq" placeholder="请再次输入登录密码" type="password"/>
				</div>
				<div class="important">*</div>
			</div>
			<div>
				<input class="submit submit-active" @click="saveAdmin()" type="button" value="保存" />
				<input class="submit" @click="adminChange(false)" type="button" value="取消修改" />
			</div>
		</div>
		<div class="list" v-if="!changeAdmin" style="margin-top: 20px;">
			<div class="type">
				<img class="type-icon" src="../assets/images/registerPerson.png"/>
				<div>管理员信息</div>
			</div>
			<div class="cell">
				<div class="name">姓名：</div>
				<div class="content">
					<input class="full" :value="adminName" disabled="disabled" type="text"/>
				</div>
			</div>
			<div class="cell">
				<div class="name">手机号码：</div>
				<div class="content">
					<input class="full" :value="adminPhone" disabled="disabled" type="text"/>
				</div>
			</div>
			<div class="cell">
				<div class="name">身份证号码：</div>
				<div class="content">
					<input class="full" :value="adminId" disabled="disabled" type="text"/>
				</div>
			</div>
			<div>
				<input class="submit submit-active" @click="adminChange(true)" type="button" value="修改管理员" />
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
	name: 'companyBaseInfo',
	components:{
		alertBoard
	},
	created:function(){
		this.$store.state.activeMenu = 'noActive';
	},
	data: function(){
		return {
			YYZZ: false,
			SFZ: false,
			SFZB: false,
			changeAdmin:false,
			adminName:'',
			adminPhone:'',
			adminId:'',
			cAdminName:'',
			cAdminPhone:'',
			cAdminCard:'',
			cAdminCardB:'',
			cAdminId:'',
			cAdminPass:'',
			cAdminPassReq:''
		}
	},
	mounted:function(){
		this.$store.commit('checkFooter');
		commonJs.checkPremission(this,'company');
		this.adminName = this.$store.state.loginState.name;
		this.adminPhone = this.$store.state.loginState.phone;
		this.adminId = this.$store.state.loginState.identification;
	},
	methods:{
		showYYZZ: function(state){
			this.YYZZ = state
		},
		saveAdmin:function(){
			let self = this;
			if(!self.cAdminName){
				self.showAlert('请输入管理员姓名');
				return false;
			}
			if(!self.cAdminPhone){
				self.showAlert('请输入管理员手机号码');
				return false;
			}
			if(self.cAdminPhone.length!=11){
				self.showAlert('请输入正确的手机号码');
				return false;
			}
			if(!self.cAdminCard){
				self.showAlert('请上传管理员身份证头像面');
				return false;
			}
			if(!self.cAdminCardB){
				self.showAlert('请上传管理员身份证国徽面');
				return false;
			}
			if(!self.cAdminId){
				self.showAlert('请输入管理员身份证号码');
				return false;
			}
			if(!self.cAdminPass){
				self.showAlert('请输入登录密码');
				return false;
			}
			if(self.cAdminPass!=self.cAdminPassReq){
				self.showAlert('两次输入的密码不一致');
				return false;
			}
			if(self.cAdminId.length!=18){
				self.showAlert('请输入正确的身份证号码');
				return false;
			}
			axios({
				url:'/api/users/enterprises/admins',
				method:'PATCH',
				data:{
					"adminName": self.cAdminName,
					"identification": self.cAdminId,
					"identificationPhotoOpposite": self.cAdminCardB,
					"identificationPhotoPositive": self.cAdminCard,
					"password": self.cAdminPass,
					"phone": self.cAdminPhone,
				}
			}).then(function(response){
				if(response.data.meta.code==200){
					self.showAlert('修改成功，重新登录后生效');
					setTimeout(function(){
						commonJs.logout(self);
					},1000);
				}else{
					self.showAlert(response.data.meta.message);
				}
			});
		},
		adminChange: function(state){
			this.changeAdmin = state;
			this.cAdminName = '';
			this.cAdminPhone = '';
			this.cAdminCard = false;
			this.cAdminCardB = false;
			this.cAdminId = '';
		},
		uploadSFZ: function(state){
			let self = this;
			if(this.checkImg($('#sfzFile').val())){
				axios.get('/api/qinius/uptoken/simple').then(function(response){
					if(response.data.meta.code=='200'){
						$('#sfzToken').val(response.data.body.uptoken);
						$('#sfzKey').val(Math.ceil(Math.random()*1000)+''+(new Date().getTime())+$('#sfzFile').val().split('\\').pop());
						var options = {  
							url:'/qiniu', //上传文件的路径  
							type:'post',
							async: false,
							dataType:'html',
							success:function(qiniuData){
								let dataJson = JSON.parse(qiniuData);
								self.cAdminCard = dataJson.key;
							}
						}; 
						$('#sfzForm').ajaxSubmit(options);
					}else{
						self.showAlert(response.data.meta.message);
						$('#sfzFile').val('');
					}
				});
			}else{
				this.cAdminCard = false;
				this.showAlert('只能上传jpg、gif和png图片');
			}
		},
		uploadSFZB: function(state){
			let self = this;
			if(this.checkImg($('#sfzbFile').val())){
				axios.get('/api/qinius/uptoken/simple').then(function(response){
					if(response.data.meta.code=='200'){
						$('#sfzbToken').val(response.data.body.uptoken);
						$('#sfzbKey').val(Math.ceil(Math.random()*1000)+''+(new Date().getTime())+$('#sfzbFile').val().split('\\').pop());
						var options = {  
							url:'/qiniu', //上传文件的路径  
							type:'post',
							async: false,
							dataType:'html',
							success:function(qiniuData){
								let dataJson = JSON.parse(qiniuData);
								self.cAdminCardB = dataJson.key;
							}
						}; 
						$('#sfzbForm').ajaxSubmit(options);
					}else{
						self.showAlert(response.data.meta.message);
						$('#sfzbFile').val('');
					}
				});
			}else{
				this.cAdminCardB = false;
				this.showAlert('只能上传jpg、gif和png图片');
			}
		},
		showSFZ: function(state){
			this.SFZ = state;
		},
		showSFZB: function(state){
			this.SFZB = state;
		},
		showAlert: function(message){
			this.$refs.alertBoard.showModal(message);
		},
		checkImg: function(name){
			let nameArr = name.toLocaleLowerCase().split('.');
			let ext = nameArr.pop();
			return ext==='jpg'||ext==='jpeg'||ext==='png'||ext==='gif';
		}
	},
	updated: function(){
		this.$store.commit('checkFooter');
		this.$store.commit('checkUserLogin');
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
		border:1px solid #B3B3B3;
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
	.register-person .list .cell .half-t{
		width: 138px;
		height: 40px;
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
	.ssfz{
		width: 200px;
	}
</style>