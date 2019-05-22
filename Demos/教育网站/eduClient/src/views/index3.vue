<template>
	<div class="index-box">
		<div class="main-box">
			<div class="login-div pull-left">
				<loginBox/>
			</div>
			<div class="banner-box pull-left">
				<div class="banner-box-div">
					<div class="banner-box-item" v-if="!bannerList.length" :style="{'background-image':'url('+require('../assets/images/loginBox.png')+')'}"></div>
					<router-link :key="'a'+index" :to="{path:'/newsDetail',query:{newsID:item.id}}" v-for="(item,index) in bannerList">
						<div class="banner-box-item" v-show="bannerShow==index" :style="{backgroundImage:'url('+item.img+')'}"></div>
					</router-link>
				</div>
				<div class="banner-point-box">
					<div v-if="bannerList.length" class="banner-title pull-left">{{bannerList[bannerShow].title}}</div>
					<div class="banner-point" @click="showBanner(index)" :class="{'banner-point-active':(index==bannerShow)}" v-for="(item,index) in bannerList"></div>
				</div>
			</div>
			<div class="banner-menu pull-left">
				<div class="banner-menu-title"><img src="../assets/images/learnType.png" class="banner-learn-icon"/>培训类别</div>
				<div class="banner-menu-cell" @click="jumpToApplyClass(1)">
					<div class="pull-left">
						<img class="menu-cell-icon" src="../assets/images/badayuan.png" />
					</div>
					<div>现场专业人员(八大员）继续教育</div>
				</div>
				<div class="banner-menu-cell" @click="jumpToApplyClass(2)">
					<div class="pull-left">
						<img class="menu-cell-icon" src="../assets/images/sanlei.png" />
					</div>
					<div>三类人员继续教育</div>
				</div>
				<div class="banner-menu-cell" @click="jumpToApplyClass(3)">
					<div class="pull-left">
						<img class="menu-cell-icon" src="../assets/images/zhuanyejishu.png" />
					</div>
					<div>专业技术职务任职（职称人员）</div>
				</div>
			</div>
			<div class="clear-fix"></div>
			<div class="learn-flow">
				<div class="learn-title">
					<div class="learn-flow-line">&nbsp;</div>&nbsp;培训流程&nbsp;<div class="learn-flow-line">&nbsp;</div>
				</div>
				<div class="clear-fix"></div>
				<router-link :to="{path:'/serviceList',query:{show:'注册用户'}}">
					<div class="learn-flow-box">
						<img class="learn-step-icon" src="../assets/images/learnRegister.png"/>
						<div class="learn-step-title">
							<div class="learn-step-num">1</div>用户注册
						</div>
					</div>
				</router-link>
				<div class="learn-arrow-box">
					<div class="arrow-box-title">&nbsp;</div>
					<img class="arrow-box-icon" src="../assets/images/learnArrow.png"/>
				</div>
				<router-link :to="{path:'/serviceList',query:{show:'选择班级'}}">
					<div class="learn-flow-box">
						<img class="learn-step-icon" src="../assets/images/learnSelect.png"/>
						<div class="learn-step-title">
							<div class="learn-step-num">2</div>选择班级
						</div>
					</div>
				</router-link>
				<div class="learn-arrow-box">
					<div class="arrow-box-title">&nbsp;</div>
					<img class="arrow-box-icon" src="../assets/images/learnArrow.png"/>
				</div>
				<router-link :to="{path:'/serviceList',query:{show:'缴纳学费'}}">
					<div class="learn-flow-box">
						<img class="learn-step-icon" src="../assets/images/learnMoney.png"/>
						<div class="learn-step-title">
							<div class="learn-step-num">3</div>缴纳学费
						</div>
					</div>
				</router-link>
				<div class="learn-arrow-box">
					<div class="arrow-box-title">&nbsp;</div>
					<img class="arrow-box-icon" src="../assets/images/learnArrow.png"/>
				</div>
				<router-link :to="{path:'/serviceList',query:{show:'在线学习'}}">
					<div class="learn-flow-box">
						<img class="learn-step-icon" src="../assets/images/learnOnline.png"/>
						<div class="learn-step-title">
							<div class="learn-step-num">4</div>在线学习
						</div>
					</div>
				</router-link>
				<div class="learn-arrow-box">
					<div class="arrow-box-title">&nbsp;</div>
					<img class="arrow-box-icon" src="../assets/images/learnArrow.png"/>
				</div>
				<router-link :to="{path:'/serviceList',query:{show:'在线考试'}}">
					<div class="learn-flow-box">
						<img class="learn-step-icon" src="../assets/images/learnExam.png"/>
						<div class="learn-step-title">
							<div class="learn-step-num">5</div>在线考试
						</div>
					</div>
				</router-link>
				<div class="learn-arrow-box">
					<div class="arrow-box-title">三类人员无需考试</div>
					<img class="arrow-box-icon" src="../assets/images/learnArrow.png"/>
				</div>
				<router-link :to="{path:'/serviceList',query:{show:'合格证明'}}">
					<div class="learn-flow-box">
						<img class="learn-step-icon" src="../assets/images/learnPass.png"/>
						<div class="learn-step-title">
							<div class="learn-step-num">6</div>合格证明
						</div>
					</div>
				</router-link>
			</div>
			<div class="ad-show">
				<img class="ad-show-image" src="../assets/images/adImg.png" />
			</div>
			<div class="message">
				<div class="news-box pull-left" style="margin-right: 1%;">
					<div class="news-box-head">
						<div class="news-box-title pull-left">新闻中心</div>
						<div class="news-box-more pull-right"><router-link :to="{path:'/newsList',query:{type:1}}">更多>></router-link></div>
						<div class="clear-fix"></div>
					</div>
					<div class="news-list" v-for="item in newsList">
						<router-link :to="{path:'/newsDetail',query:{newsID:item.id}}">
							<div class="news-list-cell">
								<div class="news-point pull-left"></div>
								<div class="news-title pull-left" :title="item.title">{{item.title.length>30?(item.title.substring(0,30)+'…'):item.title}}</div>
								<div class="news-time pull-right">{{timeToDate(item.createdDate)}}</div>
								<div class="clear-fix"></div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="news-box pull-left" style="margin-left: -4px;">
					<div class="news-box-head">
						<div class="news-box-title pull-left">培训通知</div>
						<div class="news-box-more pull-right"><router-link to="/learnNotesList">更多>></router-link></div>
						<div class="clear-fix"></div>
					</div>
					<div class="news-list" v-for="item in notesList">
						<router-link :to="{path:'/learnNotesDetail',query:{notesID:item.id}}">
							<div class="news-list-cell">
								<div class="news-point pull-left"></div>
								<div class="news-title pull-left" :title="item.title">{{item.title.length>30?(item.title.substring(0,30)+'…'):item.title}}</div>
								<div class="news-time pull-right">{{timeToDate(item.createdDate)}}</div>
								<div class="clear-fix"></div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="clear-fix"></div>
			</div>
			<div class="news-group">
				<div class="news-group-box">
					<div class="head">
						<div class="box pull-left">
							<div class="icon">
								<img class="icon-img" src="../assets/images/groupZYJS.png"/>
							</div>
							<div class="title">专业技术</div>
						</div>
						<div class="pull-right more"><router-link :to="{path:'/newsList',query:{type:2}}">更多>></router-link></div>
					</div>
					<div class="body" v-for="item in newsGroup1">
						<router-link :to="{path:'/newsDetail',query:{newsID:item.id}}">
							<div class="body-cell">
								<div class="news-point pull-left"></div>
								<div class="news-title pull-left" :title="item.title">{{item.title.length>20?(item.title.substring(0,15)+'…'):item.title}}</div>
								<div class="clear-fix"></div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="news-group-box" style="margin:0px 0.5% 0px 1%">
					<div class="head">
						<div class="box pull-left">
							<div class="icon">
								<img class="icon-img" src="../assets/images/groupZYPX.png"/>
							</div>
							<div class="title">职业培训</div>
						</div>
						<div class="pull-right more"><router-link :to="{path:'/newsList',query:{type:3}}">更多>></router-link></div>
					</div>
					<div class="body" v-for="item in newsGroup2">
						<router-link :to="{path:'/newsDetail',query:{newsID:item.id}}">
							<div class="body-cell">
								<div class="news-point pull-left"></div>
								<div class="news-title pull-left" :title="item.title">{{item.title.length>20?(item.title.substring(0,15)+'…'):item.title}}</div>
								<div class="clear-fix"></div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="news-group-box" style="margin:0px 1% 0px 0.5%">
					<div class="head">
						<div class="box pull-left">
							<div class="icon">
								<img class="icon-img" src="../assets/images/groupZSCY.png"/>
							</div>
							<div class="title">证书查阅</div>
						</div>
						<div class="pull-right more"><router-link :to="{path:'/newsList',query:{type:4}}">更多>></router-link></div>
					</div>
					<div class="body" v-for="item in newsGroup3">
						<router-link :to="{path:'/newsDetail',query:{newsID:item.id}}">
							<div class="body-cell">
								<div class="news-point pull-left"></div>
								<div class="news-title pull-left" :title="item.title">{{item.title.length>20?(item.title.substring(0,15)+'…'):item.title}}</div>
								<div class="clear-fix"></div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="news-group-box">
					<div class="head">
						<div class="box pull-left">
							<div class="icon">
								<img class="icon-img" src="../assets/images/groupZYJD.png"/>
							</div>
							<div class="title">职业鉴定</div>
						</div>
						<div class="pull-right more"><router-link :to="{path:'/newsList',query:{type:5}}">更多>></router-link></div>
					</div>
					<div class="body" v-for="item in newsGroup4">
						<router-link :to="{path:'/newsDetail',query:{newsID:item.id}}">
							<div class="body-cell">
								<div class="news-point pull-left"></div>
								<div class="news-title pull-left" :title="item.title">{{item.title.length>20?(item.title.substring(0,15)+'…'):item.title}}</div>
								<div class="clear-fix"></div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="clear-fix"></div>
			</div>
			<div class="class-show">
				<div class="news-box-head">
					<div class="news-box-title pull-left">课程展示</div>
					<div class="news-box-more pull-right"><router-link to="/classList">更多>></router-link></div>
					<div class="clear-fix"></div>
				</div>
				<div class="body" v-for="(item,index) in classShowList">
					<router-link :to="{path:'/classDetail',query:{classID:item.id}}">
						<div class="box" :class="{'first':(index==0)}">
							<img :src="$store.state.resourceDomain+item.coverPath" />
							<div class="title" :title="item.name">{{item.name.length>14?item.name.substring(0,14):item.name}}</div>
						</div>
					</router-link>
				</div>
				<div class="clear-fix"></div>
			</div>
			<!--<div class="friend-link">
				<div class="news-box-head">
					<div class="news-box-title pull-left">友情链接</div>
					<div class="news-box-more pull-right">&nbsp;</div>
					<div class="clear-fix"></div>
				</div>
				<div class="body">
					<a target="_blank" href="http://www.scbuilder.com">
						<img src="../assets/images/friendLink.png" />
					</a>
					<a target="_blank" href="http://www.sczwfw.gov.cn/app/main?areaCode=510000000000&flag=1">
						<img src="../assets/images/friendLink1.png" />
					</a>
					<a target="_blank" href="http://www.sccin.com">
						<img src="../assets/images/friendLink2.png" />
					</a>
					<a target="_blank" href="http://jtt.sc.gov.cn">
						<img src="../assets/images/friendLink3.png" />
					</a>
					<a target="_blank" href="http://www.sc.hrss.gov.cn">
						<img src="../assets/images/friendLink4.png" />
					</a>
					<a target="_blank" href="http://cdhrss.chengdu.gov.cn">
						<img src="../assets/images/friendLink5.png" />
					</a>
					<a target="_blank" href="http://www.cpta.com.cn">
						<img src="../assets/images/friendLink6.png" />
					</a>
					<a target="_blank" href="http://www.scrsw.net">
						<img src="../assets/images/friendLink7.png" />
					</a>
					<a target="_blank" href="http://jst.sc.gov.cn">
						<img src="../assets/images/friendLink8.png" />
					</a>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
import loginBox from '@/components/loginBox'
import axios from 'axios'
import {commonJs} from '@/util/commonJs'
export default{
	name: 'index',
	components:{
		loginBox
	},
	data: function(){
		return {
			notesList: '',
			newsList: '',
			newsGroup1: '',
			newsGroup2: '',
			newsGroup3: '',
			newsGroup4: '',
			classShowList: [],
			bannerList:[],
			bannerNow:0,
			bannerShow:0,
		}
	},
	created: function(){
		this.$store.state.activeMenu = 'index';
		let self = this;
		axios.get('/api/notifications/top/6').then(function(response){
			self.notesList = response.data.body.notifications;
		});
		axios.get('/api/news/top/1/6').then(function(response){
			self.newsList = response.data.body.news;
		});
		axios.get('/api/news/top/2/6').then(function(response){
			self.newsGroup1 = response.data.body.news;
		});
		axios.get('/api/news/top/3/6').then(function(response){
			self.newsGroup2 = response.data.body.news;
		});
		axios.get('/api/news/top/4/6').then(function(response){
			self.newsGroup3 = response.data.body.news;
		});
		axios.get('/api/news/top/5/6').then(function(response){
			self.newsGroup4 = response.data.body.news;
		});
		axios.get('/api/courses/5/1').then(function(response){
			self.classShowList = response.data.body.items;
		});
		
		axios.get('/api/news/banners').then(function(response){
			let bannerArr = new Array();
			response.data.body.news.forEach(function(item){
				let tmpObj = {
					id:item.id,
					title:item.title,
					img:self.$store.state.resourceDomain+item.coverPath
				};
				bannerArr.push(tmpObj);
			});
			self.bannerList = bannerArr;
			setInterval(function(){
				++self.bannerNow;
				if(self.bannerNow==self.bannerList.length){
					self.bannerShow = 0;
					self.bannerNow = 0;
				}else{
					++self.bannerShow;
				}
			},3000);
		});
	},
	updated: function(){
		this.$store.commit('checkFooter');
		this.$store.commit('checkUserLogin');
	},
	methods:{
		timeToDate: function(time){
			let date = new Date(time)
			return date.getFullYear( )+"-"+(date.getMonth()+1)+"-"+date.getDate(); 
		},
		jumpToApplyClass: function(type){
			if(!this.$store.state.loginState.state){
				alert('游客您好，请先登录');
			}else{
				if(this.$store.state.loginState.type=='person'){
					this.$router.push({path:"/applyClass",query:{type:type}});
				}else{
					this.$router.push({path:"/applyClassC",query:{type:type}});
				}
			}
		},
		showBanner: function(num){
			this.bannerShow = num;
		}
	}
}
</script>

<style scoped>
	.banner-box{
		width: 58.5%;
		height: 340px;
		margin: 0px;
		overflow: hidden;
	}
	.banner-box-item{
		height: 340px;
		width: 100%;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.banner-box-div{
		height: 340px;
	}
	.banner-point-box{
		margin-top: -34px;
		height:34px;
		background-color: rgba(0,0,0,0.55);
		text-align: right;
		padding-right: 20px;
		padding-left: 12px;
		line-height: 34px;
	}
	.banner-point{
		background-color: #737373;
		height: 8px;
		width: 8px;
		border-radius: 8px;
		display: inline-block;
		cursor: pointer;
		margin-left: 8px;
	}
	.banner-point-active{
		background-color: rgba(255,255,255,1);
	}
	.banner-title{
		color:#FFF;
		font-size: 16px;
		font-weight:bold;
		cursor: pointer;
	}
	.login-div{
		width: 18.5%;
		margin-right: 1.5%;
		padding: 16px 1%;
		background-color: #fff;
		box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
	}
	.index-box{
		background-color: #FFF;
	}
	.banner-menu{
		width: 18%;
		box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
		background:#FFF;
		height:340px;
		margin-left: 1.5%;
	}
	.banner-learn-icon{
		width: 15px;
		height: 14px;
		margin-right: 5px;
	}
	.menu-cell-icon{
		width: 38px;
		height: 35px;
		margin-right: 5px;
		margin-top: 13.73%;
	}
	.banner-menu-title{
		margin:21px 0px 0px 8.7%;
		font-size: 16px;
		font-weight: bold;
		color: #000;
		line-height: 18px;
	}
	.banner-menu-cell{
		width:84.43%;
		padding: 0px 4%;
		height:50px;
		background:rgba(29,130,210,1);
		border-radius:6px;
		margin: 0px auto;
		margin-top: 39px;
		color: #FFF;
		font-size: 14px;
		display: table;
		cursor: pointer;
	}
	.banner-menu-cell div{
		display: table-cell;
		vertical-align: middle;
	}
	.learn-flow{
		text-align: center;
		width: 100%;
		line-height:24px;
		margin-top: 24px;
		border: 1px #ddd solid;
		padding: 20px 0px;
	}
	.learn-flow-line{
		width:70px;
		height:2px;
		background:rgba(29,130,210,1);
		line-height: 2px;
		display: inline-block;
	}
	.learn-title{
		font-size:24px;
		font-weight:bold;
		color:rgba(0,0,0,1);
		height:24px;
	}
	.learn-step-icon{
		width: 100%;
		height: 100%;
		border: none;
	}
	.learn-step-num{
		width:16px;
		height:16px;
		line-height: 16px;
		background:rgba(29,130,210,1);
		border-radius:50%;
		color: #FFF;
		font-size: 12px;
		display: inline-block;
		margin-right: 2px;
	}
	.learn-step-title{
		line-height: 14px;
		height:18px;
		font-size:14px;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.learn-flow-box{
		margin-top: 24px;
		display: inline-block;
		width: 7%;
		vertical-align: middle;
	}
	.learn-arrow-box{
		margin-top: 24px;
		width: 9%;
		display: inline-block;
		vertical-align: middle;
		margin-top: -10px;
	}
	.arrow-box-icon{
		width: 35%;
	}
	.arrow-box-title{
		font-size:12px;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.news-box{
		width: 47.5%;
		padding: 0px 1%;
		border: 1px solid #DDD;
	}
	.news-box-title{
		font-size:17px;
		color:#FFF;
		background: url(../assets/images/titleBack.png);
		background-repeat: no-repeat;
		background-size: contain;
		text-align: center;
		padding-right: 10px;
		padding-top: 5px;
		width: 90px;
		height: 40px;
		margin-top: -6px;
	}
	.news-box-more{
		height:28px;
		font-size:14px;
		font-weight:bold;
		color:rgba(19,120,198,1);
		line-height:28px;
	}
	.news-box-more a{
		color:rgba(19,120,198,1);
		text-decoration: none;
	}
	.news-box-more a:visited{
		color:rgba(19,120,198,1);
	}
	.news-list-cell{
		line-height: 14px;
		margin: 20px 0px;
		font-family: "宋体";
	}
	.news-point{
		margin-top: 3px;
		width:6px;
		height:6px;
		background:rgba(186,42,23,1);
		border-radius:50%;
		margin-right: 3px;
	}
	.body-cell .news-point{
		margin-top: 6px;
	}
	.news-title{
		font-size:14px;
		color:rgba(51,51,51,1);
	}
	.news-time{
		font-size:14px;
		color:rgba(152,152,152,1);
	}
	.message{
		margin-top: 40px;
	}
	.ad-show{
		margin-top: 20px;
		width: 100%;
	}
	.ad-show-image{
		width: 100%;
	}
	.news-group{
		margin-top: 20px;
		text-align: center;
	}
	.news-group-box{
		width: 24.05%;
		float: left;
		border:1px solid rgba(19,120,198,1);
		min-height: 210px;
		background-color: #FFF;
	}
	.news-group-box .head{
		background-color: #1378C6;
		padding-left: 20px;
		height: 30px;
	}
	.news-group-box .box{
		background-color: #FFF;
		width: 120px;
	}
	.news-group-box .icon{
		width: 26px;
		height: 30px;
		display: inline-block;
		vertical-align: middle;
	}
	.news-group-box .icon .icon-img{
		vertical-align: middle;
		width: 26px;
		height: 21px;
	}
	.news-group-box .title{
		line-height: 30px;
		display: inline-block;
		height: 30px;
		font-size:16px;
		font-weight:500;
		color:rgba(0,0,0,1);
	}
	.news-group-box .body{
		background-color: #FFF;
	}
	.news-group-box .body .body-cell{
		padding: 5px 5px;
		background-color: #FFF;
	}
	.news-group-box .more a{
		color: #FFF;
		font-size: 14px;
		line-height: 30px;
		margin-right: 5px;
		text-decoration: none;
	}
	.class-show{
		margin-top: 20px;
		border: 1px #DDD solid;
		padding: 0px 1%;
		padding-bottom: 15px;
	}
	.class-show .body .box{
		margin-top: 13px;
		width: 18%;
		margin-left: 2.5%;
		float: left;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.1);
		font-size:14px;
		font-weight:bold;
		color: #000;
	}
	.class-show .body .first{
		margin-left: 0px;
	}
	.class-show .body .box img{
		width: 100%;
		height: 150px;
		border: 1px;
	}
	.class-show .body .box .title{
		min-height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 13px;
	}
	.friend-link{
		margin-top: 25px;
		padding-top: 20px;
		border-top: 1px rgba(216,216,216,1) solid;
		padding-bottom: 50px;
	}
	.friend-link .body{
		margin-top: 10px;
	}
	.friend-link .body img{
		height: 43px;
		margin-top: 15px;
		margin-right: 10px;
	}
</style>