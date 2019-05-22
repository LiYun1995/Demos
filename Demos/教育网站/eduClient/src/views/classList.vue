<template>
	<div class="main-box">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>首页>></span>
			</span>
			<span>培训课程</span>
		</div>
		<div class="class-list" v-if="classList.length!=0">
			<ol class="list">
				<li class="cell" v-for="item in classList">
					<div class="box pull-left">
						<div class="img">
							<img @mouseleave="showSmaller" @mouseenter="showBigger" :src="$store.state.resourceDomain+item.coverPath" />
						</div>
						<div class="content">
							<div class="title">{{item.name}}</div>
							<router-link :to="{path:'/classDetail',query:{classID:item.id}}">
								<div class="btn">查看详情</div>
							</router-link>
						</div>
					</div>
				</li>
				<div class="clear-fix"></div>
			</ol>
			<div class="page-box">
				<button class="head-foot" @click="pageJump('-1')">上一页</button>
					<div class="list">
						<button class="item" v-for="item in pageArr" :disabled="(item=='…')" :class="{'active':(pageNow==item)}" @click="pageJump(item)">{{item}}</button>
					</div>
				<button class="head-foot" @click="pageJump('+1')">下一页</button>
			</div>
		</div>
		<div v-if="classList.length==0">
			<noData/>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import noData from '@/components/noData'
export default{
	name: 'classList',
	components:{
		noData
	},
	updated: function(){
		this.$store.commit('checkFooter');
	},
	data: function(){
		return {
			classList: [],
			pageTotal: 1,
			pageArr: '',
			pageNow: 1
		}
	},
	created: function(){
		this.getList(1);
		this.$store.state.activeMenu = 'classList';
	},
	methods:{
		getList: function(nowPage){
			let self = this;
			axios.get('/api/courses/15/'+nowPage).then(function(response){
				self.classList = response.data.body.items;
				self.pageTotal = Math.ceil(response.data.body.total / 15);
				self.showPageGroup();
			});
		},
		showPageGroup: function(){
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
			this.getList(this.pageNow);
		},
		timeToDate: function(time){
			let date = new Date(time)
			return date.getFullYear( )+"-"+(date.getMonth()+1)+"-"+date.getDate(); 
		},
		showBigger:function(object){
			$(object.target).animate({
				width:'120%',
				height:'120%',
				'margin-left':'-10%',
				'margin-top':'-5%'
			});
		},
		showSmaller:function(object){
			$(object.target).animate({
				width:'100%',
				height:'100%',
				'margin-left':'0px',
				'margin-top':'0px'
			});
		}
	}
}
</script>

<style scoped>
	.class-list{
		margin-top: 10px;
		margin-bottom: 42px;
	}
	.class-list .box{
		width: 23%;
		margin: 0px 1%;
		margin-bottom: 37px;
		display: table;
	}
	.class-list .list{
		list-style: none;
	}
	.class-list .img{
		width: 100%;
		height: 150px;
		overflow: hidden;
		cursor: pointer;
	}
	.class-list .img img{
		width: 100%;
		height: 150px;
	}
	.class-list .content{
		word-break: break-all;
		width: 100%;
		border: 1px solid #DDD;
		border-top: none;
		padding: 10px 0px;
		margin: 0px -1px;
	}
	.class-list .content .title{
		font-size: 14px;
		text-align: center;
		margin-bottom: 10px;
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
		margin: 0px auto;
	}
	.class-list .content a{
		text-decoration: none;
	}
	.page-box{
		text-align: center;
		width: 100%;
		display: inline-block;
		font-size: 0px;
		cursor: pointer;
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