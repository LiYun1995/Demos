<template>
	<div class="main-box apply-class">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>首页>></span>
			</span>
			<span>报名培训</span>
		</div>
		<div class="class-title"></div>
		<div class="search">
			<div>专业类别：</div>
			<div>
				<select class="select" v-model="classType" @change="getList()">
					<option value="0">全部</option>
					<option :value="item.id" v-for="item in classTypeArr">{{item.name}}</option>
				</select>
			</div>
		</div>
		<div class="class-list" v-if="classList.length!=0">
			<ol class="list">
				<li class="cell" v-for="item in classList">
					<div class="box pull-left">
						<div class="img">
							<img :src="$store.state.resourceDomain+item.coverPath" />
						</div>
						<div class="content">
							<div class="title">{{item.name}}</div>
							<!--<div class="time">开课时间：{{timeToDate(item.createdDate)}}</div>-->
							<div class="teacher">学时：{{item.score}}</div>
							<div class="teacher">价格：<span style="color:red">￥{{item.price}}</span></div>
							<div class="description">课程简介：{{item.notes.length>30?(item.notes.substring(30)+'…'):item.notes}}</div>
							<div>
								<button @click="applyClass(item.id)" class="btn">立即预约</button>
							</div>
						</div>
					</div>
				</li>
				<div class="clear-fix"></div>
			</ol>
		</div>
		<noData v-if="classList.length==0"/>
		<alertBoard ref="alertBoard"/>
	</div>
</template>

<script>
import alertBoard from '@/components/alertBoard'
import axios from 'axios'
import {commonJs} from '@/util/commonJs'
import noData from '@/components/noData'
export default{
	name: 'applyClassC',
	components:{
		alertBoard,noData
	},
	mounted: function(){
//		if(!this.$store.state.loginState.state){
//			this.$router.push('/');
//			return false;
//		}
		commonJs.checkPremission(this,'company');
	},
	data: function(){
		return {
			classList: [],
			pageTotal: 16,
			pageArr: '',
			pageNow: 1,
			classType: this.$route.query.type===undefined?0:this.$route.query.type,
			classTypeArr: []
		}
	},
	methods:{
		applyClass: function(classID){
			this.$router.push({path:'/addPerson',query:{classID:classID}});
		},
		getList: function(page){
			let self = this;
			axios.get('/api/specialties/30/1',{
				params:{
					name:'',
					typeId: self.classType>0?self.classType:'',
				}
			}).then(function(response){
				self.classList = response.data.body.list;
			});
		},
		timeToDate: function(time){
			let date = new Date(time)
			return date.getFullYear( )+"-"+(date.getMonth()+1)+"-"+date.getDate(); 
		},
		showAlert: function(message){
			this.$refs.alertBoard.showModal(message);
		}
	},
	created: function(){
		let self = this;
		axios.get('/api/specialties/types').then(function(response){
			self.classTypeArr = response.data.body.detail;
			self.getList(1);
		});
		this.$store.state.activeMenu = 'noActive';
	},
	updated: function(){
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
	.apply-class .top{
		display: table;
		font-size:14px;
		height:20px;
	}
	.apply-class .top img{
		width:18px;
		height:20px;
		margin-right: 12px;
	}
	.apply-class .top span{
		display: table-cell;
		vertical-align: middle;
	}
	.apply-class .top .back{
		color: #1D82D2;
	}
	.apply-class .class-title{
		margin-top: 15px;
	}
	
	.class-list{
		margin-bottom: 42px;
	}
	.class-list .box{
		width: 50%;
		margin-bottom: 37px;
		display: table;
	}
	.class-list .list{
		list-style: none;
	}
	.class-list .img{
		width: 35%;
		float: left;
		display: table-cell;
		vertical-align: middle;
		height: 100%;
	}
	.class-list .img img{
		width: 100%;
		display: table-cell;
		vertical-align: middle;
		height: 150px;
	}
	.class-list .content{
		word-break: break-all;
		float: left;
		width: 57%;
		margin-left: 1%;
		margin-right: 7%;
		display: table-cell;
		vertical-align: middle;
	}
	.class-list .content .title{
		font-size: 18px;
		font-weight:bold;
		margin-bottom: 5px;
	}
	.class-list .content .time{
		margin-bottom: 5px;
		font-size: 14px;
		color: #666666;
	}
	.class-list .content .teacher{
		margin-bottom: 5px;
		font-size: 14px;
	}
	.class-list .content .description{
		margin-bottom: 5px;
		font-size: 14px;
		height:38px;
	}
	.class-list .content .btn{
		font-size: 14px;
		color: #fff;
		border-radius:6px;
		width:80px;
		height:30px;
		background-color: #1D82D2;
		line-height: 30px;
		text-align: center;
		border: none;
	}
</style>