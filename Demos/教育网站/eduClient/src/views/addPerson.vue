<template>
	<div class="main-box add-person">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>报名培训>></span>
			</span>
			<span>添加培训人员</span>
		</div>
		<div class="type">
			<img class="type-icon" src="../assets/images/registerPerson.png"/>
			<div>添加培训人员</div>
		</div>
		
		<div class="people-list" v-for="(item,index) in peopleList">
			<div class="cell">
				<div>姓名：<input placeholder="请输入培训人员姓名" type="text" v-model="peopleList[index].name"/><span class="important">*</span></div>
				<div>手机号码：<input placeholder="请输入培训人员手机号码" type="text" v-model="peopleList[index].phone"/><span class="important">*</span></div>
				<div>身份证号码：<input placeholder="请输入培训人员身份证号码" type="text" v-model="peopleList[index].identification"/><span class="important">*</span></div>
			</div>
			<div class="pull-right">
				<button class="btn" @click="delItem(index)" v-if="index!=peopleList.length-1">删除</button>
				<button class="btn" @click="addItem()" v-if="index==peopleList.length-1">新增</button>
			</div>
			<div class="clear-fix"></div>
		</div>
		
		<div class="table">
			<div class="head">
				<div class="time">订单详情</div>
			</div>
			<div class="body">
				<div class="img">
					<img :src="img"/>
				</div>
				<div class="info-box">
					<div class="title">{{title}}</div>
					<div class="year">培训年度：{{year}}</div>
					<div class="class-type">培训类别：{{classType}}</div>
				</div>
				<div class="price">￥{{price}}</div>
				<div class="num">{{corderNum}}</div>
				<div class="total">￥{{ctotal}}</div>
			</div>
		</div>
		<div class="pull-right pay-money">应付金额：<div>￥{{ctotal}}</div></div>
		<div class="clear-fix"></div>
		<div class="pull-right">
			<button class="pay-btn" @click="applyClass()">提交订单</button>
		</div>
		<div class="clear-fix"></div>
		<alertBoard ref="alertBoard"/>
	</div>
</template>

<script>
import axios from 'axios'
import alertBoard from '@/components/alertBoard'
export default{
	name: 'addPerson',
	components:{
		alertBoard
	},
	data: function(){
		return {
			img: '',
			title: '',
			year: '',
			classType: '',
			price: 0,
			peopleList:[
				{name:'',phone:'',identification:''}
			]
		}
	},
	created:function(){
		let self = this;
		axios.get('/api/specialties/'+self.$route.query.classID).then(function(response){
			if(response.data.meta.code==200){
				let classDetail = response.data.body.detail;
				self.year = self.timeToYear(classDetail.createdDate);
				self.price = classDetail.price;
				self.title = classDetail.name;
				self.classType = classDetail.typeName;
				self.img = self.$store.state.resourceDomain+classDetail.coverPath;
			}
		});
		this.$store.state.activeMenu = 'noActive';
	},
	computed:{
		ctotal:function(){
			return this.corderNum * this.price;
		},
		corderNum:function(){
			return this.peopleList.length;
		}
	},
	updated:function(){
		this.$store.commit('checkFooter');
	},
	methods:{
		delItem: function(index){
			this.peopleList.splice(index,1);
		},
		addItem: function(){
			this.peopleList.push({name:'',phone:'',identification:''});
		},
		timeToYear: function(time){
			let date = new Date(time)
			return date.getFullYear( ); 
		},
		applyClass: function(){
			if(confirm('确认信息无误？')){
				let self = this;
				let check = false;
				self.peopleList.forEach(function(item,index){
					if(!item.name){
						self.showAlert('第'+(index+1)+'行培训人员姓名为空');
						check = true;
					}else if(!item.phone||item.phone.length!=11){
						self.showAlert('第'+(index+1)+'行培训人员手机号码有误');
						check = true;
					}else if(!item.identification||item.identification.length!=18){
						self.showAlert('第'+(index+1)+'行培训人员身份证号码有误');
						check = true;
					}
				});
				if(!check){
					axios.post('/api/orders',{
						orderUsers:self.peopleList,
						specialtyId: self.$route.query.classID
					}).then(function(response){
						if(response.data.meta.code==200){
							self.showAlert('预约成功，请到【成都市金牛区实业街59号附25号5楼9号】缴纳相关费用！');
							self.peopleList = [{name:'',phone:'',identification:''}];
						}else{
							self.showAlert(response.data.meta.message);
						}
					});
				}
			}
		},
		showAlert: function(message){
			this.$refs.alertBoard.showModal(message);
		}
	}
}
</script>

<style scoped>
	.add-person .important{
		font-size: 24px;
		color:#BA2A17;
		padding-left: 5px;
	}
	
	.add-person .type{
		display: table;
		margin: 21px 0px;
		font-size: 18px;
		color:#1D82D2;
		font-weight:bold;
	}
	.add-person .type img{
		width: 24px;
		height: 24px;
		margin-right: 5px;
	}
	.add-person .type img,.add-person .type div{
		display: table-cell;
		vertical-align: middle;
	}
	
	.table{
		margin-top: 50px;
		border:1px solid #D9D9D9;
	}
	.table .head{
		background-color: #EAF8FF;
		height: 40px;
		font-size:14px;
	}
	.table .head div{
		display: inline-block;
		line-height: 40px;
		font-size:14px;
	}
	.table .head .time{
		padding-left: 20px;
		width: 44%;
	}
	.table .head .orderID{
		width: 32%;
	}
	.table .head .pay-type{
		width: 15%;
	}
	.table .body{
		padding: 1%;
		display: table;
	}
	.table .body .img{
		width: 11%;
		display: table-cell;
		vertical-align: middle;
	}
	.table .body img{
		width: 100%;
	}
	.table .body .info-box{
		display: table-cell;
		vertical-align: middle;
		width: 40%;
		padding-left: 1%;
	}
	.table .body .price{
		display: table-cell;
		vertical-align: middle;
		width: 8%;
	}
	.table .body .title{
		padding-bottom: 30px;
		font-size:16px;
		font-weight: bold;
	}
	.table .body .year{
		font-size:14px;
		color: #808080;
	}
	.table .body .class-type{
		font-size:14px;
		color: #808080;
	}
	.table .body .num{
		display: table-cell;
		vertical-align: middle;
		width: 8%;
	}
	.table .body .total{
		display: table-cell;
		vertical-align: middle;
		width: 8%;
		color:#BA2A17;
		font-size: 18px;
	}
	.pay-money{
		font-size:14px;
		line-height: 24px;
		display: table;
		padding-right: 30px;
		margin-top: 30px;
	}
	.pay-money div{
		font-size:24px;
		color:#BA2A17;
		display: table-cell;
		vertical-align: middle;
	}
	.pay-btn{
		margin-top: 38px;
		width:180px;
		height:50px;
		background:rgba(29,130,210,1);
		border-radius:4px;
		color: #FFF;
		border: none;
		margin-bottom: 32px;
	}
	.add-person .people-list .cell div{
		display: inline-block;
		height: 50px;
		width: 30%;
		margin: 10px 0px;
		font-size:18px;
	}
	.add-person .people-list .cell{
		padding-bottom: 10px;
		border-bottom: 1px #B3B3B3 dashed;
	}
	.add-person .people-list input{
		width:60%;
		height: 50px;
		padding-left: 10px;
		font-size:18px;
	}
	.add-person .people-list .btn{
		background-color: #1D82D2;
		color: #FFF;
		border: none;
		width:73px;
		height:28px;
		border-radius:4px;
		margin: 10px 0px;
	}
</style>