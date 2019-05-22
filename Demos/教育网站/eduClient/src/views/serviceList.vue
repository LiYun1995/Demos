<template>
	<div class="main-box service-list">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>办事服务>></span>
			</span>
			<span>{{cshowPage}}</span>
		</div>
		<div class="menu pull-left">
			<!--<div @click="showContent('热点问题')" :class="{active: cshowPage=='热点问题'}">热点问题</div>-->
			<div @click="showContent('注册用户')" :class="{active: cshowPage=='注册用户'}">注册用户</div>
			<div @click="showContent('选择班级')" :class="{active: cshowPage=='选择班级'}">选择班级</div>
			<div @click="showContent('缴纳学费')" :class="{active: cshowPage=='缴纳学费'}">缴纳学费</div>
			<div @click="showContent('在线学习')" :class="{active: cshowPage=='在线学习'}">在线学习</div>
			<div @click="showContent('在线考试')" :class="{active: cshowPage=='在线考试'}">在线考试</div>
			<div @click="showContent('合格证明')" :class="{active: cshowPage=='合格证明'}">合格证明</div>
		</div>
		<div class="content pull-left">
			<!--<div v-if="cshowPage=='热点问题'">
				<serviceQA/>
			</div>-->
			<div v-if="cshowPage=='注册用户'">
				<serviceRegister/>
			</div>
			<div v-if="cshowPage=='选择班级'">
				<serviceClass/>
			</div>
			<div v-if="cshowPage=='缴纳学费'">
				<serviceMoney/>
			</div>
			<div v-if="cshowPage=='在线学习'">
				<serviceStudy/>
			</div>
			<div v-if="cshowPage=='在线考试'">
				<serviceExam/>
			</div>
			<div v-if="cshowPage=='合格证明'">
				<servicePass/>
			</div>
		</div>
		<div class="clear-fix"></div>
	</div>
</template>

<script>
import serviceQA from '../components/serviceQA'
import serviceRegister from '../components/serviceRegister'
import serviceClass from '../components/serviceClass'
import serviceMoney from '../components/serviceMoney'
import serviceStudy from '../components/serviceStudy'
import serviceExam from '../components/serviceExam'
import servicePass from '../components/servicePass'
export default{
	name: 'serviceList',
	components:{
		serviceQA,serviceRegister,serviceClass,serviceMoney,serviceStudy,serviceExam,servicePass
	},
	computed: {
		cshowPage: function(){
			return this.$route.query.show;
		}
	},
	created:function(){
		this.$store.state.activeMenu = 'serviceList';
	},
	methods:{
		showContent: function(page){
			this.$router.push({path:'serviceList',query:{show:page}});
		}
	}
}
</script>

<style scoped>
	.service-list .top{
		display: table;
		font-size:14px;
		height:20px;
		margin-bottom: 30px;
	}
	.service-list .top img{
		width:18px;
		height:20px;
		margin-right: 12px;
	}
	.service-list .top span{
		display: table-cell;
		vertical-align: middle;
	}
	.service-list .top .back{
		color: #1D82D2;
	}
	.service-list .menu .active{
		color: #1D82D2;
	}
	.service-list .menu{
		width: 20%;
		cursor: pointer;
	}
	.service-list .menu div{
		padding: 15px 0px 15px 20px;
		border-bottom: 1px #B2B2B2 solid;
		border-top: 1px #B2B2B2 solid;
		margin-top:-1px;
	}
	.service-list .content{
		float: right;
		width: 74%;
		height: 100%;
		padding: 0px 22px 0px 22px;
		padding-bottom: 60px;
	}
</style>