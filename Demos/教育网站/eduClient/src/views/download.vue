<template>
	<div class="main-box">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>首页>></span>
			</span>
			<span>下载中心</span>
		</div>
		<div class="news-list">
			<div class="body" v-if="newsList.length!=0">
				<ol class="list">
					<a target="_blank" v-for="item in newsList" :href="$store.state.resourceDomain+item.path">
						<li class="cell">
								<div style="width: 100%;">
									<div class="news-point pull-left"></div>
									<div class="pull-left">{{item.name}}</div>
									<div class="pull-right time">{{timeToDate(item.createdDate)}}</div>
								</div>
						</li>
					</a>
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
			<div v-if="newsList.length==0">
				<noData/>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import noData from '@/components/noData'
export default{
	name: 'download',
	components:{
		noData
	},
	updated: function(){
		this.$store.commit('checkFooter');
	},
	created: function(){
		this.getList(1);
		this.$store.state.activeMenu = 'downloadCenter';
	},
	data: function(){
		return {
			newsList: [],
			pageTotal: 1,
			pageArr: '',
			pageNow: 1
		}
	},
	computed:{
		ctitle: function(){
			return this.$route.query.title;
		},
		ctype: function(){
			return this.$route.query.type;
		}
	},
	watch:{
		ctitle: function(){
			this.getList(1);
		},
		ctype: function(){
			this.getList(1);
		}
	},
	methods:{
		getList: function(nowPage){
			let self = this;
			axios.get('/api/attachmentes/15/'+nowPage,{
				params:{
					title: this.$route.query.title
				}
			}).then(function(response){
				self.newsList = response.data.body.items;
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
		}
	}
}
</script>

<style scoped>
	.news-list .img{
		width: 100%;
	}
	.news-list .img img{
		width: 100%;
	}
	.news-list .body .list{
		list-style: none;
		margin-bottom: 60px;
	}
	.news-list .body .list .cell{
		height: 56px;
		line-height: 56px;
		border-bottom: 1px #B2B2B2 dashed;
	}
	.news-list .body .list .cell .time{
		font-size: 14px;
		font-weight: bold;
		text-decoration: none;
		color: #989898;
	}
	.news-list .body .list a{
		font-size: 14px;
		text-decoration: none;
		color: #000;
	}
	.news-point{
		margin-top: 25px;
		width:6px;
		height:6px;
		background:rgba(186,42,23,1);
		border-radius:50%;
		margin-right: 5px;
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