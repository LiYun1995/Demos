<template>
	<div>
		<div class="type">
			<img class="type-icon" src="../assets/images/registerProcess.png"/>
			<div>培训进度</div>
		</div>
		
		<div class="ball-box">
			<div class="box-cell">
				<div class="class-ball-back">
					<div class="class-ball color-blue">
						<div class="process-title">
							<div style="margin-top: 16px;">已学<span>{{process?((process*100).toFixed(2)):0}}</span>%</div>
						</div>
						<div class="ball-process color-blue-deep" :style="{marginTop:((100-process*100)*1.36)+'px'}"></div>
					</div>
				</div>
				<div class="title">课程</div>
			</div>
			<div class="box-cell">
				<div class="class-ball-back">
					<div class="class-ball color-red">
						<div class="process-title">
							<div>最高分<span>{{userExam.maxScore?userExam.maxScore:0}}</span>分</div>
							<div>已考<span>{{userExam.examNumber?userExam.examNumber:0}}</span>次</div>
						</div>
						<div class="ball-process color-red-deep" :style="{marginTop:((100-(userExam.maxScore/userExam.totalScore)*100)*1.36)+'px'}"></div>
					</div>
				</div>
				<div class="title">考试</div>
			</div>
			<div class="box-cell">
				<div class="class-ball-back">
					<div class="class-ball" :class="{'color-blue':!userExam.passed, 'color-blue-deep':userExam.passed}">
						<div class="process-title">
							<div style="margin-top: 16px;"><span>{{userExam.passed?'已通过':'未通过'}}</span></div>
						</div>
					</div>
				</div>
				<div class="title">培训结果</div>
			</div>
		</div>
		<div class="tool-bar">
			<div class="active person">课程列表</div>
			<!--<div @click="enterExam()"><div class="person">已完成</div></div>-->
		</div>
		<div class="class-list">
			<div class="cell" v-for="item in classList">
				<div class="pull-left img">
					<img :src="item.img"/>
				</div>
				<div class="pull-left content">
					<div class="title">{{item.title}}</div>
					<div class="class-time">课程进度：</div>
					<div class="process-box">
						<div class="process-background">
							<div class="process-fill" :style="{width:item.classProcess+'%'}"></div>
						</div>
						<div class="class-time-num">
							{{item.classProcess}}%
						</div>
						<div class="clear-fix"></div>
					</div>
					<router-link :to="{path:'videoList',query:{uclassID:item.uclassID,classID:item.classID}}">
						<div class="btn">开始学习</div>
					</router-link>
				</div>
			</div>
			<div class="clear-fix"></div>
		</div>
		<!--<div class="page-box">
			<button class="head-foot" @click="pageJump('-1')">上一页</button>
				<div class="list">
					<button class="item" v-for="item in pageArr" :disabled="(item=='…')" :class="{'active':(pageNow==item)}" @click="pageJump(item)">{{item}}</button>
				</div>
			<button class="head-foot" @click="pageJump('+1')">下一页</button>
		</div>-->
	</div>
</template>

<script>
import axios from'axios'
export default{
	name: 'classProcess',
	props:['userExam','process'],
	data: function(){
		return {
			classList:[],
			classProcessTotal:100,
			classTimeTotal:5.3,
			scoreBest:92,
			examTotal:5,
			isPass:true,
			pageTotal: 16,
			pageArr: '',
			pageNow: 1
		}
	},
	created: function(){
		let self = this;
		axios.get('/api/courses/userSpecialties/'+self.$route.query.uclassID).then(function(response){
			self.classList = new Array();
			if(response.data.meta.code==200){
				response.data.body.items.forEach(function(item){
					let tmpObj = {
						img:self.$store.state.resourceDomain+item.courses.coverPath,
						title:item.courses.name,
						classProcess:item.progress*100,
						uclassID:item.id,
						classID:item.courses.id
					};
					self.classList.push(tmpObj);
				});
			}
		});
	},
	updated:function(){
		this.$store.commit('checkFooter');
		//this.showPageGroup();
	},
	methods:{
		/*showPageGroup: function(){
			this.pageArr = new Array();
			if(this.pageTotal<5){
				var tmpNum = 0;
				while((tmpNum++)<this.pageTotal){
					this.pageArr.push(tmpNum);
				}
			}else{
				this.pageArr.push(1);
				var tmp = 0;
				if(this.pageNow==2){
					this.pageArr.push(2);
				}
				if(this.pageNow>2){
					this.pageArr.push('…');
					tmp = this.pageNow - 1;
					this.pageArr.push(tmp);
					this.pageArr.push(this.pageNow);
				}
				if(this.pageNow+1<=this.pageTotal&&this.pageNow+1!=this.pageTotal){
					tmp = this.pageNow + 1;
					this.pageArr.push(tmp);
					this.pageArr.push('…');
				}
				if(this.pageNow!=this.pageTotal){
					this.pageArr.push(this.pageTotal);
				}
			}
		},
		pageJump: function(pageSize){
			if(pageSize === '-1'){
				if(this.pageNow - 1 > 0){
					this.pageNow -= 1;
				}
			}else if(pageSize === '+1'){
				if(this.pageNow < this.pageTotal){
					this.pageNow += 1;
				}
			}else{
				this.pageNow = pageSize;
			}
			this.showPageGroup();
		}*/
	}
}
</script>

<style scoped>
	.top{
		display: table;
		font-size:14px;
		height:20px;
	}
	.top img{
		width:18px;
		height:20px;
		margin-right: 12px;
	}
	.top span{
		display: table-cell;
		vertical-align: middle;
	}
	.top .back{
		color: #1D82D2;
	}
	.tool-bar{
		line-height: 52px;
		border-bottom: 1px #CCCCCC solid;
	}
	.tool-bar .person,.register-person .tool-bar .company{
		font-size: 22px;
		font-weight: bold;
		width: 150px;
		text-align: center;
		cursor: pointer;
	}
	.tool-bar .active{
		border-bottom: 4px #1D82D2 solid;
		color: #1D82D2;
	}
	.tool-bar a{
		color: #000;
	}
	.tool-bar div{
		display: inline-block;
	}
	.class-title{
		border-left: 6px solid #1D82D2;
		font-size:18px;
		line-height: 27px;
		margin: 20px 0px 28px 0px;
		padding-left: 6px;
	}
	
	.type{
		display: table;
		font-size: 18px;
		color:#1D82D2;
		font-weight:bold;
		margin: 35px 0px 26px 0px;
	}
	.type img{
		width: 24px;
		height: 24px;
		margin-right: 5px;
	}
	.type img,.type div{
		display: table-cell;
		vertical-align: middle;
	}
	
	.box-cell{
		text-align: center;
		width: 32%;
		display: inline-block;
	}
	.box-cell .title{
		font-size:16px;
		font-weight: bold;
		margin-top:13px;
		margin-bottom: 50px;
	}
	.class-ball-back{
		background-color: #E9EAEB;
		height: 142px;
		width: 142px;
		border-radius: 142px;
		padding: 3px;
		margin: 0px auto;
	}
	.class-ball{
		margin: 3px 3px;
		height: 136px;
		width: 136px;
		border-radius: 130px;
		overflow: hidden;
		text-align: center;
	}
	.ball-process{
		height: 136px;
		width: 136px;
	}
	.process-title{
		position: absolute;
		width: 142px;
		height: 142px;
		margin-top: 35px;
		font-size: 14px;
		font-weight: 500;
	}
	.process-title span{
		font-size: 24px;
	}
	.color-blue{
		background-color: #B3CEE3;
	}
	.color-blue-deep{
		background-color: #1D82D2;
	}
	.color-red{
		background-color: #F09F9F;
	}
	.color-red-deep{
		background-color: #E46868;
	}
	
	.class-list{
		margin: 20px 0px;
		width: 100%;
	}
	.class-list .cell{
		margin-top: 20px;
		width: 48%;
		display: inline-block;
		margin-right: 2%;
	}
	.class-list .img{
		width: 26%;
		margin-right: 2%;
	}
	.class-list .img img{
		width: 100%;
	}
	.class-list .content{
		width: 72%;
	}
	.class-list .content .title{
		font-size: 18px;
		font-weight: bold;
	}
	.class-list .content .class-time{
		margin-top: 10px;
		font-size: 14px;
		color:#666666;
	}
	.class-list .content .process-background{
		float: left;
		width: 85%;
		background-color: #D9D9D9;
		height: 10px;
		border-radius: 10px;
	}
	.class-list .content .process-fill{
		background-color: #33BE6A;
		height: 10px;
		border-radius: 10px;
	}
	.class-list .content .class-time-num{
		float: left;
		font-size: 14px;
		width: 14%;
		margin-left: 1%;
		margin-top: -4px;
	}
	.class-list .btn{
		width: 80px;
		height: 30px;
		background-color: #1D82D2;
		color:#FFF;
		border-radius: 6px;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
	}
	.class-list a{
		text-decoration: none;
	}
	
	.page-box{
		text-align: center;
		width: 100%;
		display: inline-block;
		font-size: 0px;
		cursor: pointer;
		margin-bottom: 60px;
	}
	.page-box .head-foot{
		display: inline-block;
		width: 52px;
		height: 32px;
		border: 1px #B2B2B2 solid;
		margin: 0px;
		color: #333;
		font-size: 14px;
		line-height: 32px;
		margin-left: -1px;
		font-weight: bold;
		background-color: #FFF;
	}
	.page-box .head-foot:hover,.page-box .list .item:hover{
		color: #FFF;
		background-color: #1D82D2;
	}
	.page-box .list .active{
		color: #FFF !important;
		background-color: #1D82D2 !important;
	}
	.page-box .list{
		display: inline-block;
		margin: 0px;
	}
	.page-box .list .item{
		display: inline-block;
		width: 32px;
		height: 32px;
		border: 1px #B2B2B2 solid;
		margin: 0px;
		color: #333;
		font-size: 14px;
		line-height: 32px;
		margin-left: -1px;
		font-weight:bold;
		background-color: #FFF;
	}
</style>