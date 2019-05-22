<template>
	<div class="main-box news-detail">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>培训通知>></span>
			</span>
			<span>{{newsTitle}}</span>
		</div>
		<div class="news-title">{{newsTitle}}</div>
		<div class="news-info">
			<div class="editor">编辑：{{editor}}</div>
			<div class="time">发布时间：{{newsTime}}</div>
		</div>
		<div class="news-content" v-html="newsContent"></div>
	</div>
</template>

<script>
import axios from 'axios'
export default{
	name: 'learnNotesDetail',
	data: function(){
		return {
			newsTime: '',
			editor: '',
			newsTitle: '',
			newsContent:''
		}
	},
	created: function(){
		let self = this;
		axios.get('/api/notifications/'+this.$route.query.notesID).then(function(response){
			let detail = response.data.body.detail;
			self.newsTime = self.timeToDate(detail.createdDate);
			self.newsTitle = detail.title;
			self.newsContent = detail.content;
			self.editor = detail.publisher;
		});
		this.$store.state.activeMenu = 'notes';
	},
	updated:function(){
		this.$store.commit('checkFooter');
	},
	methods: {
		timeToDate: function(time){
			let date = new Date(time);
			return date.getFullYear( )+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
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