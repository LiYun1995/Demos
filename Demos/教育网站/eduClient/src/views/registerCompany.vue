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
			<span>单位注册</span>
		</div>
		<div class="tool-bar">
			<router-link to="/registerPerson"><div class="person">用户注册</div></router-link>
			<div class="active company">单位注册</div>
			<div class="pull-right login">
				<span>已有账号，</span>
				<router-link to="/">点击登录</router-link>
			</div>
		</div>
		<div class="message-alert">温馨提示：请输入您本人及单位的真实信息，以下信息将会影响您的单位及学员管理的相关操作，请仔细核对，确保输入正确，</div>
		<div class="list">
			<div class="type">
				<img class="type-icon" src="../assets/images/registerCompany.png"/>
				<div>单位信息</div>
			</div>
			
			<div class="cell">
				<div class="name">单位名称：</div>
				<div class="content">
					<input class="full" placeholder="请输入单位名称" v-model="enterpriseName" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">单位所在地区：</div>
				<div class="content">
					<select class="half-t" v-model="provinse" @change="getCityList()">
						<option value="0">请选择省份</option>
						<option v-for="item in provinceArr" :value="item.id">{{item.name}}</option>
					</select>
					<select class="half-t" v-model="city">
						<option value="0">请选择城市</option>
						<option v-for="item in cityArr" :value="item.id">{{item.name}}</option>
					</select>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">单位详细地址：</div>
				<div class="content">
					<input class="full" v-model="address" placeholder="请输入单位详细地址" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">组织机构代码统一社会信用代码：</div>
				<div class="content">
					<input class="full" v-model="organizationCode" placeholder="请输入组织机构代码统一社会信用代码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">营业执照原件照片：</div>
				<div class="content">
					<form id="yyzzForm" enctype="multipart/form-data" action="http://upload.qiniup.com/">
						<input id="yyzzKey" name="key" type="hidden" value=""/>
						<input name="accept" type="hidden" value="text/html"/>
						<input id="yyzzToken" name="token" type="hidden" value=""/>
						<input id="yyzzFile" name="file" class="half" type="file" @change="uploadYYZZ" accept="image/png,image/gif,image/jpeg"/>
						<button type="button" @mouseenter="showYYZZ(true)" @mouseleave="showYYZZ(false)" class="half-small">查看示例照片</button>
					</form>
				</div>
				<div class="important">*</div>
				<img class="yyzz" v-show="YYZZ" src="../assets/images/yingyezhizhao.png" />
			</div>
			<div class="clear-fix"></div>
		</div>
		<div class="list" style="margin-top: 20px;">
			<div class="type">
				<img class="type-icon" src="../assets/images/registerPerson.png"/>
				<div>单位管理员信息</div>
			</div>
			
			<div class="cell">
				<div class="name">管理员姓名：</div>
				<div class="content">
					<input class="full" v-model="adminName" placeholder="请输入您的真实姓名" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">身份证号码：</div>
				<div class="content">
					<input class="full" v-model="identification" placeholder="请输入您的18位身份证号码" type="text"/>
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
				<div class="name">手机号码：</div>
				<div class="content">
					<input class="full" v-model="phone" placeholder="请输入您的11位手机号码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">请输入短信码：</div>
				<div class="content">
					<input v-model="smsCode" class="half" placeholder="请输入短信验证码" type="text"/>
					<button class="half-small" :disabled="!smsState" @click="sendCode()">{{smsState?'获取短信验证码':(smsTime+' 秒')}}</button>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">密码：</div>
				<div class="content">
					<input class="full" v-model="password" placeholder="请输入8-20位长度的密码" type="password"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">确认密码：</div>
				<div class="content">
					<input class="full" v-model="reqpass" placeholder="请再次输入密码" type="password"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">请输入图形码：</div>
				<div class="content">
					<input class="half" placeholder="请输入验证码" type="text" v-model="vcode"/>
					<img class="half-small" :src="vImg" @click="changeImg()"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="clear-fix"></div>
		</div>
		<div class="rule">
			<input type="checkbox" v-model="rule"/>我已阅读<router-link to="/rule">《巴蜀继续教育在线学习中心平台注册协议》</router-link>
		</div>
		<div>
			<input class="submit submit-active" type="button" value="提交" @click="register()"/>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import alertBoard from '@/components/alertBoard'
export default{
	name: 'registerCompany',
	components:{
		alertBoard
	},
	data: function(){
		return {
			provinceArr:[],
			cityArr:[],
			YYZZ: false,
			SFZ: false,
			SFZB: false,
			provinse: 0,
			city: 0,
			address:'',
			adminName:'',
			chartered:'',
			enterpriseName:'',
			identification:'',
			identificationPhotoOpposite:'',
			identificationPhotoPositive:'',
			organizationCode:'',
			password:'',
			reqpass:'',
			phone:'',
			regionId:'',
			vImg:'/api/enterprises/imagecode/png/300/30/25',
			vcode:'',
			smsCode:'',
			rule:'',
			smsState:true,
			smsTime:300,
			smsHandl: null
		}
	},
	created:function(){
		let self = this;
		axios.get('/api/regions/root').then(function(response){
			self.provinceArr = response.data.body.roots;
		});
		this.$store.state.activeMenu = 'index';
	},
	mounted:function(){
		this.$store.commit('checkFooter');
	},
	methods:{
		register: function(){
			if(!this.enterpriseName){
				this.showAlert('请填写单位名称');
				return false;
			}
			if(!this.city||this.city===0){
				this.showAlert('请选择单位所在地区');
				return false;
			}
			if(!this.address){
				this.showAlert('请填写单位详细地址');
				return false;
			}
			if(!this.chartered){
				this.showAlert('请上传营业执照');
				console.log(this.chartered)
				return false;
			}
			if(!this.adminName){
				this.showAlert('请填写管理员姓名');
				return false;
			}
			if(!this.identification||this.identification.length!=18){
				this.showAlert('请填写正确格式的身份证号');
				return false;
			}
			if(!this.identificationPhotoPositive){
				this.showAlert('请上传身份证头像面');
				return false;
			}
			if(!this.identificationPhotoOpposite){
				this.showAlert('请上传身份证国徽面');
				return false;
			}
			if(!this.phone||this.phone.length!=11){
				this.showAlert('请填写正确格式的手机号码');
				return false;
			}
			if(!this.smsCode){
				this.showAlert('请填写短信验证码');
				return false;
			}
			if(!this.password||this.password.length<8||this.password.length>20){
				this.showAlert('请填写8-20位的密码');
				return false;
			}
			if(!this.reqpass){
				this.showAlert('请再次填写密码');
				return false;
			}
			if(this.reqpass!=this.password){
				this.showAlert('两次密码输入不一致');
				return false;
			}
			if(!this.vcode){
				this.showAlert('请填写图形验证码');
				return false;
			}
			if(!this.rule){
				this.showAlert('请先阅读《巴蜀继续教育在线学习中心平台注册协议》');
				return false;
			}
			let self = this;
			axios.post('/api/enterprises',{
				"address": self.address,
				"adminName": self.adminName,
				"chartered": self.chartered,
				"enterpriseName": self.enterpriseName,
				"identification": self.identification,
				"identificationPhotoOpposite": self.identificationPhotoOpposite,
				"identificationPhotoPositive": self.identificationPhotoPositive,
				"organizationCode": self.organizationCode,
				"password": self.reqpass,
				"phone": self.phone,
				"regionId": self.city,
				"imgValidataCode": self.vcode,
				"smsValidataCode": self.smsCode
			}).then(function(response){
				if(response.data.meta.code==200){
					self.showAlert(response.data.body.result);
					setTimeout(function(){
						self.$refs.alertBoard.modalBordState = false;
						self.$router.push({path:'/'});
					},3000);
				}else{
					self.showAlert(response.data.meta.message);
				}
			});
		},
		showYYZZ: function(state){
			this.YYZZ = state;
		},
		uploadYYZZ: function(){
			let self = this;
			if(this.checkImg($('#yyzzFile').val())){
				axios.get('/api/qinius/uptoken/simple').then(function(response){
					if(response.data.meta.code=='200'){
						$('#yyzzToken').val(response.data.body.uptoken);
						$('#yyzzKey').val(Math.ceil(Math.random()*1000)+''+(new Date().getTime())+$('#yyzzFile').val().split('\\').pop());
						var options = {  
							url:'/qiniu', //上传文件的路径  
							type:'post',
							async: false,
							dataType:'html',
							success:function(qiniuData){
								let dataJson = JSON.parse(qiniuData);
								self.chartered = dataJson.key;
							}
						}; 
						$('#yyzzForm').ajaxSubmit(options);
					}else{
						self.showAlert(response.data.meta.message);
					}
				});
			}else{
				this.chartered = false;
				this.showAlert('只能上传jpg、gif和png图片');
			}
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
								self.identificationPhotoPositive = dataJson.key;
							}
						}; 
						$('#sfzForm').ajaxSubmit(options);
					}else{
						self.showAlert(response.data.meta.message);
					}
				});
			}else{
				this.identificationPhotoPositive = false;
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
								self.identificationPhotoOpposite = dataJson.key;
							}
						}; 
						$('#sfzbForm').ajaxSubmit(options);
					}else{
						self.showAlert(response.data.meta.message);
					}
				});
			}else{
				this.identificationPhotoPositive = false;
				this.showAlert('只能上传jpg、gif和png图片');
			}
		},
		showSFZ: function(state){
			this.SFZ = state;
		},
		showSFZB: function(state){
			this.SFZB = state;
		},
		getCityList: function(){
			let self = this;
			axios.get('/api/regions/'+self.provinse+'/children').then(function(response){
				self.cityArr = response.data.body.regions;
			});
		},
		showAlert: function(message){
			this.$refs.alertBoard.showModal(message);
		},
		sendCode: function(){
			let self = this;
			if(!self.phone||self.phone.length!=11){
				self.showAlert('请填写正确的手机号码');
				return false;
			}
			axios.get('/api/enterprises/phone/validatacode',{
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
		changeImg: function(){
			this.vImg += '?';
		},
		checkImg: function(name){
			let nameArr = name.toLocaleLowerCase().split('.');
			let ext = nameArr.pop();
			return ext==='jpg'||ext==='jpeg'||ext==='png'||ext==='gif';
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
	.register-person .list .cell .half-small{
		margin-left: 11px;
		width: 175px;
		height: 44px;
		vertical-align: middle;
	}
	.register-person .list .cell .half-t{
		width: 209px;
		height: 40px;
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