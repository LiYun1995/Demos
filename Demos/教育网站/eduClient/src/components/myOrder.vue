<template>
	<div class="my-order">
		<div class="search">
			<div>订单类型：</div>
			<div>
				<select class="select" v-model="orderType">
					<option value="0">全部</option>
					<option value="2">个人</option>
					<option value="1">企业</option>
				</select>
			</div>
			<div>
				<button @click="getList()" class="search-btn">搜索</button>
			</div>
		</div>
		<div class="table-title">
			<div class="tname">商品名称</div>
			<div class="tprice">单价</div>
			<div class="tnum">数量</div>
			<div class="ttotal">合计</div>
			<div class="tstatus">订单状态</div>
			<div class="tact">操作</div>
		</div>
		<div class="order-list" v-if="orderList.length!=0">
			<div class="box" v-for="(item,index) in orderList">
				<div class="head">
					<div class="time">{{item.time}}</div>
					<div class="order-num">订单号：{{item.orderID}}</div>
					<div class="channel">下单方式：{{item.channel}}</div>
				</div>
				<div class="body">
					<div class="img-box">
						<img class="img" :src="item.img"/>
					</div>
					<div class="info-box">
						<div class="title">{{item.title}}</div>
						<div class="year">培训年度：{{item.year}}</div>
						<div class="type">培训类别：{{item.type}}</div>
					</div>
					<div class="price">￥{{item.price}}</div>
					<div class="num">{{item.num}}</div>
					<div class="total">￥{{item.total}}</div>
					<div class="status">{{item.status}}</div>
					<div class="btn-group">
						<button class="btn" v-if="!item.show" @click="showNameList(index,true)">查看名单</button>
						<button class="btn" v-if="item.show" @click="showNameList(index,false)">隐藏名单</button>
					</div>
				</div>
				<div class="name-list" v-if="item.show">
					<div v-if="item.status!='已支付'" style="color:red;text-align: center;">请到【成都市金牛区实业街59号附25号5楼9号】缴纳相关费用！</div>
					<div class="list-head">
						<div class="IDcard">身份证</div>
						<div class="name">姓名</div>
						<div class="phone">手机号</div>
					</div>
					<div class="cell" v-for="itemTmp in item.userList">
						<div>{{itemTmp.identification}}</div>
						<div>{{itemTmp.name}}</div>
						<div>{{itemTmp.phone}}</div>
					</div>
				</div>
			</div>
		</div>
		<noData v-if="orderList.length==0"/>
	</div>
</template>

<script>
import axios from 'axios'
import noData from '@/components/noData'
export default{
	name: 'myOrder',
	components:{
		noData
	},
	data: function(){
		return {
			orderList: [],
			orderType:0
		}
	},
	created: function(){
		this.getList();
	},
	methods:{
		showNameList: function(item,state){
			this.orderList[item].show = state;
		},
		getList: function(){
			let self = this;
			axios.get('/api/orders/users/100/1',{
				params:{
					orderType:self.orderType*1===0?'':self.orderType
				}
			}).then(function(response){
				if(response.data.meta.code==200){
					self.orderList = new Array();
					response.data.body.items.forEach(function(item){
						axios.get('/api/orders/'+item.id+'/items').then(function(res){
							let tmpInfo = res.data.body.items;
							let objTmp = {
								show:false,
								img:(self.$store.state.resourceDomain+tmpInfo.specialtyVo.coverPath),
								price:item.price,
								num:1,
								total:tmpInfo.specialtyVo.price,
								status:item.orderStatus=='UNPAID'?'待支付':'已支付',
								time:self.timeToDate(tmpInfo.specialtyVo.createdDate),
								orderID:item.orderNumber,
								channel:item.orderNumber==1?'企业报名':'个人报名',
								title:tmpInfo.specialtyVo.name,
								year:self.timeToYear(item.createdDate),
								type:tmpInfo.specialtyVo.typeName,
								userList:[]
							};
							objTmp.userList = tmpInfo.userList;
							self.orderList.push(objTmp);
						});
					});
				}
			});
		},
		timeToDate: function(time){
			let date = new Date(time)
			return date.getFullYear( )+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
		},
		timeToYear: function(time){
			let date = new Date(time)
			return date.getFullYear( ); 
		}
	},
	updated:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style scoped>
	.search{
		font-size:16px;
		font-weight:500;
		line-height:27px;
		display: table;
		height: 40px;
		margin-bottom: 26px;
	}
	.search div{
		display: table-cell;
		vertical-align: middle;
	}
	.search select{
		height: 40px;
		width: 160px;
	}
	.search .title{
		padding-left: 96px;
	}
	.search .search-btn{
		width:80px;
		height:40px;
		background-color: #1D82D2;
		border-radius:4px;
		color: #FFF;
		border: none;
		margin-left: 10px;
	}
	
	.table-title{
		height: 40px;
		background-color: #F5F5F5;
		border:1px solid #D9D9D9;
		line-height: 40px;
		font-size: 14px;
	}
	.table-title div{
		display: inline-block;
		text-align: center;
	}
	.table-title .tname{
		width: 50%;
	}
	.table-title .tprice{
		width: 10%;
	}
	.table-title .tnum{
		width: 6%;
	}
	.table-title .ttotal{
		width: 10%;
	}
	.table-title .tstatus{
		width: 10%;
	}
	.table-title .tact{
		width: 10%;
	}
	.order-list .head{
		background-color: #EAF8FF;
		font-size: 14px;
	}
	.order-list .box{
		margin-top: 10px;
		border:1px solid #D9D9D9;
	}
	.order-list .head div{
		display: inline-block;
		height: 40px;
		line-height: 40px;
	}
	.order-list .time{
		width: 30%;
		padding-left: 20px;
	}
	.order-list .order-num{
		width: 45%;
	}
	.order-list .channel{
		width: 20%;
	}
	.my-order{
		margin-bottom: 60px;
	}
	.order-list .body{
		border-top:1px solid #D9D9D9;
		display: table;
		font-size: 14px;
	}
	.order-list .img-box{
		display: table-cell;
		vertical-align: middle;
		width: 18%;
		padding: 1%;
	}
	.order-list .img{
		width: 100%;
		display: table-cell;
		vertical-align: middle;
	}
	.order-list .info-box{
		display: table-cell;
		vertical-align: middle;
		width: 31%;
	}
	.order-list .info-box .title{
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 10px;
	}
	.order-list .info-box .year{
		color: #808080;
	}
	.order-list .info-box .type{
		color: #808080;
	}
	.order-list .price{
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		width: 7%;
	}
	.order-list .num{
		display: table-cell;
		vertical-align: middle;
		width: 8%;
		text-align: center;
	}
	.order-list .total{
		display: table-cell;
		vertical-align: middle;
		width: 8%;
		text-align: center;
	}
	.order-list .status{
		display: table-cell;
		vertical-align: middle;
		width: 12%;
		text-align: center;
	}
	.order-list .btn-link{
	}
	.order-list .btn{
		background-color: #1D82D2;
		color: #FFF;
		height:28px;
		border-radius:4px;
		border: none;
		padding: 0px 5px;
	}
	.order-list .btn-group{
		display: table-cell;
		vertical-align: middle;
		width: 10%;
		text-align: center;
	}
	
	.my-order .name-list{
		border-top:1px solid #D9D9D9;
		padding: 1%;
	}
	.my-order .list-head div{
		display: inline-block;
		width: 32%;
		text-align: center;
		font-size: 14px;
		color: #808080;
	}
	.my-order .cell div{
		display: inline-block;
		width: 32%;
		text-align: center;
		margin-top: 5px;
		color: #808080;
		font-size: 14px;
	}
</style>