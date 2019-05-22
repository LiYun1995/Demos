<template>
	<div class="main-box register-person">
		<alertBoard ref="alertBoard"/>
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>个人设置>></span>
			</span>
			<span>收货地址</span>
		</div>
		<div class="tool-bar">
			<router-link to="/personBaseInfo"><div class="company">基础信息</div></router-link>
			<div class="active person">收件地址</div>
			<router-link to="/personChangePassword"><div class="person">修改密码</div></router-link>
		</div>
		<div class="message-alert">请正确填写您的收件地址，以便下一次报名培训班级时作为发票的邮寄地址，感谢您的配合！</div>
		<div class="list">
			<div class="cell">
				<div class="name">收件人：</div>
				<div class="content">
					<input v-model="name" class="full" placeholder="请输入收件人真实姓名" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">手机号码：</div>
				<div class="content">
					<input v-model="phone" class="full" placeholder="请输入手机号码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">收件地区：</div>
				<div class="content">
					<select v-model="province" class="half-t" @change="getCityList()">
						<option value="0">请选择省份</option>
						<option v-for="item in provinceArr" :value="item.id">{{item.name}}</option>
					</select>
					<select v-model="city" class="half-t">
						<option value="0">请选择城市</option>
						<option v-for="item in cityArr" :value="item.id">{{item.name}}</option>
					</select>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">详细地址：</div>
				<div class="content">
					<textarea v-model="address" class="full textarea" placeholder="请输入详细地址"></textarea>
				</div>
				<div class="important">*</div>
			</div>
			<div class="cell">
				<div class="name">邮政编码：</div>
				<div class="content">
					<input v-model="postcode" class="full" placeholder="请输入邮政编码" type="text"/>
				</div>
				<div class="important">*</div>
			</div>
			<div class="clear-fix"></div>
		</div>
		
		<div>
			<input class="submit submit-active" @click="updateAddress()" type="button" value="保存" />
		</div>
	</div>
</template>

<script>
import alertBoard from '@/components/alertBoard'
import axios from 'axios'
import {commonJs} from '@/util/commonJs'
export default{
	name: 'personAddress',
	components:{
		alertBoard
	},
	data: function(){
		return {
			first:false,
			provinceArr:[],
			cityArr:[],
			province:0,
			city:0,
			name:'',
			phone:'',
			address:'',
			postcode:'',
			addressID:0
		}
	},
	created:function(){
		this.$store.state.activeMenu = 'noActive';
		let self = this;
		axios.get('/api/regions/root').then(function(response){
			self.provinceArr = response.data.body.roots;
		});
		axios.get('/api/users/adress').then(function(response){
			if(response.data.body.adress){
				let addressTmp = response.data.body.adress;
				self.name = addressTmp.receiver;
				self.phone = addressTmp.phone;
				self.address = addressTmp.detailAdress;
				self.postcode = addressTmp.postcode;
				self.addressID = addressTmp.id;
				axios.get('/api/regions/paths/'+addressTmp.regionId).then(function(res){
					self.province = res.data.body.paths.id;
					self.city = res.data.body.paths.region.id;
					self.getCityList();
				});
			}else{
				self.first = true;
			}
		});
		commonJs.checkPremission(this,'person');
	},
	mounted:function(){
		this.$store.commit('checkFooter');
	},
	methods:{
		getCityList: function(){
			let self = this;
			axios.get('/api/regions/'+self.province+'/children').then(function(response){
				self.cityArr = response.data.body.regions;
			});
		},
		updateAddress:function(){
			let self = this;
			if(!self.name){
				self.showAlert('请填写收件人真实姓名');
				return false;
			}else if(!self.phone){
				self.showAlert('请填写收件人手机号码');
				return false;
			}else if(self.phone*1%1!=0||self.phone.length!=11){
				self.showAlert('请填写正确的手机号码');
				return false;
			}else if(!self.province){
				self.showAlert('请选择省份');
				return false;
			}else if(!self.city){
				self.showAlert('请选择城市');
				return false;
			}else if(!self.address){
				self.showAlert('请填写详细地址');
				return false;
			}else if(!self.postcode){
				self.showAlert('请填写邮政编码');
				return false;
			}
			let url = '';
			if(self.first){
				axios({
					url:'/api/users/adress',
					method:'POST',
					params:{
						regionId:self.city,
						receiver:self.name,
						phone:self.phone,
						detailAdress:self.address,
						postcode:self.postcode
					}
				}).then(function(response){
					if(response.data.meta.code==200){
						self.showAlert('修改成功');
					}else{
						self.showAlert(response.data.meta.message);
					}
				});
			}else{
				axios({
					url:'/api/users/adress/'+self.addressID,
					method:'PATCH',
					data:{
						regionId:self.city,
						receiver:self.name,
						phone:self.phone,
						detailAdress:self.address,
						postcode:self.postcode
					}
				}).then(function(response){
					if(response.data.meta.code==200){
						self.showAlert('修改成功');
					}else{
						self.showAlert(response.data.meta.message);
					}
				});
			}
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
	.register-person .list .cell .textarea{
		width: 394px;
		height: 100px;
		resize: none;
		padding: 14px;
	}
	.register-person .list .cell .half{
		width: 210px;
	}
	.register-person .list .cell .half-t{
		width: 209px;
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