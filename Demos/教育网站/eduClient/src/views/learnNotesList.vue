<template>
	<div class="main-box">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>首页>></span>
			</span>
			<span>培训通知</span>
		</div>
		<div class="news-list" v-if="newsList.length!=0">
			<div class="img">
				<img src="../assets/images/newsList.png" />
			</div>
			<div class="body">
				<ol class="list">
					<router-link :key="'a'+index" v-for="(item,index) in newsList" :to="{path:'/learnNotesDetail',query:{notesID:item.id}}">
						<li class="cell">
								<div class="news-point pull-left"></div>
								<div class="pull-left" :title="item.title">{{item.title}}</div>
								<div class="pull-right time">{{timeToDate(item.createdDate)}}</div>
						</li>
					</router-link>
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
		</div>
		<div v-if="newsList.length==0">
			<noData/>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import noData from '@/components/noData'
export default{
	name: 'learnNotesList',
	components:{
		noData
	},
	updated:function(){
		this.$store.commit('checkFooter');
	},
	data: function(){
		return {
			newsList: [],
			pageTotal: 1,
			pageArr: '',
			pageNow: 1
		}
	},
	created: function(){
		this.getList(1);
		this.$store.state.activeMenu = 'notes';
	},
	computed:{
		ctitle: function(){
			return this.$route.query.title;
		}
	},
	watch:{
		ctitle: function(){
			this.getList(1);
		}
	},
	methods:{
		getList: function(nowPage){
			let self = this;
			axios.get('/api/notifications/15/'+nowPage,{
				params:{
					title: this.$route.query.title
				}
			}).then(function(response){
				self.newsList = response.data.body.notifications;
				self.pageTotal = Math.ceil(response.data.body.totalRows / 15);
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
			return date.getFullYear( )+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
		}
	}
}
</script>

<style scoped>
	.news-list .img{
		width: 100%;
		margin-top: 10px;
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