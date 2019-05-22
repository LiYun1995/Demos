<template>
	<div class="main-box class-detail">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>课程详情>></span>
			</span>
			<span>{{classTitle}}</span>
		</div>
		<div class="class-title">{{classTitle}}</div>
		<table>
			<tr>
				<td class="title" valign="top">
					<img class="pull-left" src="../assets/images/classDetailTime.png" />
					<div class="pull-left">创建时间：</div>
				</td>
				<td class="content" valign="top">
					{{createTime}}
				</td>
				<td rowspan="2" style="width: 25%;">
					<img style="width: 90%;" class="pull-right" :src="classImg"/>
				</td>
			</tr>
			<tr>
				<td class="title" valign="top">
					<img class="pull-left" src="../assets/images/classDetailDescription.png" />
					<div class="pull-left">课程简介：</div>
				</td>
				<td valign="top" class="content">
					<div v-html="description"></div>
				</td>
			</tr>
			<tr>
				<td class="title" valign="top">
					<img class="pull-left" src="../assets/images/classDetailTeacher.png" />
					<div class="pull-left">讲师简介：</div>
				</td>
				<td colspan="2" valign="top" class="content">
					<div v-html="teacher"></div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import axios from 'axios'
export default{
	name: 'classDetail',
	data: function(){
		return {
			classTitle: '',
			createTime: '',
			description: '',
			teacher: '',
			classImg: ''
		}
	},
	created: function(){
		let self = this;
		axios.get('/api/courses/'+this.$route.query.classID).then(function(response){
			self.classTitle = response.data.body.detail.name;
			self.createTime = self.timeToDate(response.data.body.detail.createdDate);
			self.description = response.data.body.detail.notes;
			self.teacher = response.data.body.detail.techerNotes;
			//self.classImg = 'https://lanhu.oss-cn-beijing.aliyuncs.com/ps492dc8a0b6bbcbfb-5afa-4f7d-87e2-a9b00f99c025';
			self.classImg = self.$store.state.resourceDomain+response.data.body.detail.coverPath;
		});
		this.$store.state.activeMenu = 'classList';
	},
	updated:function(){
		this.$store.commit('checkFooter');
	},
	methods:{
		timeToDate: function(time){
			let date = new Date(time)
			return date.getFullYear( )+"-"+(date.getMonth()+1)+"-"+date.getDate(); 
		}
	}
}
</script>

<style scoped>
	.class-detail .top{
		display: table;
		font-size:14px;
		height:20px;
	}
	.class-detail .top img{
		width:18px;
		height:20px;
		margin-right: 12px;
	}
	.class-detail .top span{
		display: table-cell;
		vertical-align: middle;
	}
	.class-detail .top .back{
		color: #1D82D2;
	}
	.class-detail .class-title{
		font-size:26px;
		font-weight:bold;
		text-align: center;
		margin-top: 43px;
		padding-bottom: 20px;
		border-bottom: 1px #B2B2B2 solid;
		margin-bottom:33px;
	}
	.class-detail .title{
		width: 140px;
		font-size: 20px;
	}
	.class-detail .content{
		font-size: 16px;
		font-weight: 500;
		line-height:27px;
	}
	.class-detail .title img{
		width: 24px;
		margin-right: 5px;
	}
	.class-detail .title div{
		line-height: 24px;
	}
	.class-detail table{
		margin-bottom: 163px;
	}
</style>