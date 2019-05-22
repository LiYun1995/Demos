<template>
	<div class="main-box news-detail">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>新闻中心>></span>
			</span>
			<span>{{newsTitle}}</span>
		</div>
		<div class="news-title">{{newsTitle}}</div>
		<div class="news-info">
			<div class="editor">编辑：{{editor}}</div>
			<div class="time">发布时间：{{newsTime}}</div>
		</div>
		<div class="news-content" v-html="newsContent"></div>
		<div class="more-news">
			<div class="cell">
				<router-link :to="{path:'/newsDetail',query:{newsID:moreNews.last.newsID}}">上一条：{{moreNews.last.title}}</router-link></div>
			<div class="cell">
				<router-link :to="{path:'/newsDetail',query:{newsID:moreNews.next.newsID}}">下一条：{{moreNews.next.title}}</router-link></div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default{
	name: 'newsDetail',
	data: function(){
		return {
			newsTime: '',
			editor: '',
			moreNews: {
				last:{
					newsID:false,
					title: '暂无'
				},
				next:{
					newsID:false,
					title: '暂无'
				}
			},
			newsTitle: '',
			newsContent:''
		}
	},
	watch:{
		cnowID: function(){
			this.loadNews();
		}
	},
	computed: {
		cnowID: function(){
			return this.$route.query.newsID;
		}
	},
	created: function(){
		this.loadNews();
		this.$store.state.activeMenu = 'news';
	},
	updated:function(){
		this.$store.commit('checkFooter');
	},
	methods: {
		timeToDate: function(time){
			let date = new Date(time);
			return date.getFullYear( )+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
		},
		loadNews: function(){
			let self = this;
			axios.get('/api/news/'+this.$route.query.newsID).then(function(response){
				let detail = response.data.body.detail;
				self.newsTime = self.timeToDate(detail.createdDate);
				self.newsTitle = detail.title;
				self.newsContent = detail.content;
				self.editor = detail.publisher;
			});
			axios.get('/api/news/'+this.$route.query.newsID+'/last').then(function(response){
				let detail = response.data.body.detail;
				self.moreNews.last.newsID = detail.id;
				self.moreNews.last.title = detail.title;
			});
			axios.get('/api/news/'+this.$route.query.newsID+'/next').then(function(response){
				let detail = response.data.body.detail;
				if(detail){
					self.moreNews.next.newsID = detail.id;
					self.moreNews.next.title = detail.title;
				}
			});
		}
	}
}
</script>

<style scoped>
	.news-detail .top{
		display: table;
		font-size:14px;
		height:20px;
	}
	.news-detail .top img{
		width:18px;
		height:20px;
		margin-right: 12px;
	}
	.news-detail .top span{
		display: table-cell;
		vertical-align: middle;
	}
	.news-detail .top .back{
		color: #1D82D2;
	}
	.news-detail .news-title{
		font-size:26px;
		font-weight:bold;
		text-align: center;
		margin-top: 43px;
		margin-bottom: 20px;
	}
	.news-detail .news-info{
		font-size:14px;
		font-weight: 500;
		color: #989898;
		text-align: center;
		padding-bottom: 21px;
		border-bottom: 1px #B2B2B2 solid;
		margin-bottom: 22px;
	}
	.news-detail .news-info div{
		display: inline-block;
		margin:0px 1%;
	}
	.news-detail .news-content{
		padding-bottom: 31px;
		border-bottom: 1px #B2B2B2 solid;
	}
	.news-detail .more-news{
		margin:17px 0px 60px 0px;
	}
	.news-detail .more-news .cell{
		margin-top: 21px;
	}
	.news-detail .more-news .cell a{
		text-decoration: none;
		color: #000;
		font-weight: bold;
	}
	.news-detail .more-news .cell a:hover{
		text-decoration: none;
		color: #1D82D2;
		font-weight: bold;
	}
</style>