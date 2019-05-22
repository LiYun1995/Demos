<template>
	<div>
		<messageBoard/>
		<div class="head-top">
			<div class="head-box">
				<div class="logo">
					<router-link to="/"><img class="logo-img" src="@/assets/images/logo.png"/></router-link>
				</div>
				<div class="head-top-box">
					<div>
						<div class="head-service" @mouseenter="showService(true)" @mouseleave="showService(false)">微信客服</div>
						<div class="head-service" @click="showMessageboard()">我要留言</div>
						<div class="service-qrcode" v-show="serviceShow"><img src="../assets/images/qrcode.jpg" /></div>
					</div>
					<div class="service-phone">
						<div class="service-icon">
							<img src="@/assets/images/call.png"/>
						</div>
						<div class="service-content">
							<div class="service-phonenumber">028-86117611</div>
							<div class="service-name">客服电话</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="menu-box">
			<div class="head-box">
				<div class="head-menu">
					<div class="head-menu-box">
						<router-link to="/"><div :class="{'menu-cell-active':$store.state.activeMenu=='index'}" class="menu-cell">首页</div></router-link>
						<router-link :to="{path:'/newsList',query:{type:1}}"><div :class="{'menu-cell-active':$store.state.activeMenu=='news'}" class="menu-cell">新闻中心</div></router-link>
						<router-link to="/learnNotesList"><div :class="{'menu-cell-active':$store.state.activeMenu=='notes'}" class="menu-cell">培训通知</div></router-link>
						<router-link to="/classList"><div :class="{'menu-cell-active':$store.state.activeMenu=='classList'}" class="menu-cell">培训课程</div></router-link>
						<router-link to="/serviceList?show=注册用户"><div :class="{'menu-cell-active':$store.state.activeMenu=='serviceList'}" class="menu-cell">办事服务</div></router-link>
						<a href="javascript:void(0);"><div :class="{'menu-cell-active':$store.state.activeMenu=='scoreSelect'}" class="menu-cell" @click="jumpToScore()">成绩查询</div></a>
						<router-link to="/download"><div :class="{'menu-cell-active':$store.state.activeMenu=='downloadCenter'}" class="menu-cell">下载中心</div></router-link>
						<router-link to="/aboutUs"><div :class="{'menu-cell-active':$store.state.activeMenu=='aboutUs'}" class="menu-cell">关于我们</div></router-link>
					</div>
					<div class="search">
						<select class="search-select" v-model="searchType">
							<option value="0">通知</option>
							<option value="1">新闻中心</option>
							<option value="2">新闻专业技术</option>
							<option value="3">职业培训</option>
							<option value="4">证书查阅</option>
							<option value="5">职业鉴定</option>
						</select><img class="search-icon" src="@/assets/images/search.png"/><input class="search-input" v-model="searchKey" placeholder="请输入关键词"/><input @click="searchSomething()" type="button" class="search-btn" value="搜索"/>
					</div>
				</div>
			</div>
		</div>
		<headNotes></headNotes>
		<div class="clear-fix"></div>
	</div>
</template>

<script>
import headNotes from '@/components/headNotes'
import messageBoard from '@/components/messageBoard'
export default {
	name: 'headerComponent',
	components:{
		headNotes,messageBoard
	},
	data: function(){
		return {
			searchKey: '',
			searchType: 0,
			serviceShow: false,
			boardState: false
		}
	},
	methods: {
		searchSomething: function(){
			if(this.searchType==0){
				this.$router.push({path:'/learnNotesList',query:{title:this.searchKey}});
			}else if(this.searchType==1){
				this.$router.push({path:'/newsList?type=1',query:{title:this.searchKey}});
			}else if(this.searchType==2){
				this.$router.push({path:'/newsList?type=2',query:{title:this.searchKey}});
			}else if(this.searchType==3){
				this.$router.push({path:'/newsList?type=3',query:{title:this.searchKey}});
			}else if(this.searchType==4){
				this.$router.push({path:'/newsList?type=4',query:{title:this.searchKey}});
			}else if(this.searchType==5){
				this.$router.push({path:'/newsList?type=5',query:{title:this.searchKey}});
			}
		},
		showService: function(state){
			this.serviceShow = state;
		},
		showMessageboard: function(){
			if(!this.$store.state.loginState.state){
				alert('游客您好，请先登录');
			}else{
				this.$store.commit('showMessageBoard',true);
			}
		},
		jumpToScore:function(){
			if(!this.$store.state.loginState.state){
				alert('游客您好，请先登录');
			}else{
				if(this.$store.state.loginState.type=='person'){
					this.$router.push({path:'/personCenter?show=我的班级'});
				}else{
					alert('个人账号才可查询成绩！');
				}
			}
		}
	},
	mounted:function(){
		this.$store.commit('checkUserLogin');
	}
}
</script>

<style scoped>
	.head-box{
		width:1440px;
		margin:0px auto;
		clear: both;
	}
	.head-top{
		background-image: url('../assets/images/header.png');
		background-repeat: no-repeat;
		background-size: cover;
		height: 162px;
		margin: 0px;
		padding: 0px;
	}
	.head-service{
		background-image: url('../assets/images/headTop.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 78px;
		height: 40px;
		display: inline-block;
		vertical-align: middle;
		color:#474746;
		font-size: 12px;
		font-weight: 400;
		line-height: 52px;
		text-align: center;
		cursor: pointer;
	}
	.logo-img{
		width: 100%;
		margin-top:50px;
		max-height: 82px;
		border: none;
	}
	.logo{
		float: left;
		width: 40%;
	}
	.head-top-box{
		float: right;
	}
	.service-phone{
		margin-top: 17px;
		clear: both;
	}
	.service-qrcode{
		position: absolute;
		width: 160px;
		height: 160px;
	}
	.service-qrcode img{
		width: 160px;
		height: 160px;
	}
	.service-icon{
		float: left;
	}
	.service-icon img{
		width: 31px;
		height: 31px;
		margin: 8px 5px 0px 0px;
	}
	.service-content{
		float: left;
	}
	.service-phonenumber{
		font-size: 20px;
		font-weight: bold;
		color: #BA2A17;
	}
	.service-name{
		font-size: 12px;
		color:#484847;
		font-weight:400;
	}
	.menu-box{
		width:100%;
		background-color: #1D82D2;
		height: 50px;
		line-height: 50px;
	}
	.head-menu{
		clear: both;
	}
	.menu-cell{
		text-align: center;
		width:8.3%;
		color:#FFF;
		text-decoration: none;
		float: left;
		font-size: 16px;
	}
	.menu-cell:hover{
		background-color: rgba(255,255,255,0.25);
	}
	.menu-cell-active{
		background-color: rgba(255,255,255,0.25);
	}
	.search{
		float: right;
		vertical-align: middle;
	}
	.search-select{
		height: 34px;
		border-radius:4px 0px 0px 4px;
		border: none;
		width: 60px;
	}
	.search-input{
		height: 34px;
		border: none;
		border-left: 1px #ccc solid;
		margin-left:-24px;
		padding-left: 30px;
	}
	.search-icon{
		z-index: 999;
		position: relative;
		width: 14px;
		margin-left: 10px;
		vertical-align: middle;
		margin-top: -2px;
	}
	.search-btn{
		background-color: #BA2A17;
		border: none;
		border-radius:0px 4px 4px 0px;
		height: 34px;
		color:#fff;
		width:66px;
		cursor: pointer;
	}
	@media only screen and (max-width: 1750px) {
		.head-box{
			width: 84%;
		}
	}
	@media only screen and (max-width: 1600px) {
		.head-box{
			width: 87%;
		}
	}
	@media only screen and (max-width: 1450px) {
		.head-box{
			width: 96%;
		}
		.search-input{
			width: 150px;
		}
	}
</style>