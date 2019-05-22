<template>
	<div class="main-box service-list">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>学员中心>></span>
			</span>
			<span>{{cshowPage}}</span>
		</div>
		<div class="menu pull-left">
			<div @click="showContent('我的订单')" :class="{active: cshowPage=='我的订单'}">我的订单</div>
		</div>
		<div class="content pull-left">
			<div v-if="cshowPage=='我的订单'">
				<myOrderC/>
			</div>
		</div>
		<div class="clear-fix"></div>
	</div>
</template>

<script>
import myOrderC from '../components/myOrderC'
import {commonJs} from '@/util/commonJs'
export default{
	name: 'companyCenter',
	components: {
		myOrderC
	},
	computed: {
		cshowPage: function(){
			return this.$route.query.show;
		}
	},
	methods:{
		showContent: function(page){
			this.$router.push({path:'companyCenter',query:{show:page}});
		}
	},
	mounted:function(){
		commonJs.checkPremission(this,'company');
	},
	created:function(){
		this.$store.state.activeMenu = 'noActive';
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
		float: left;
		width: 74%;
		height: 100%;
		margin-left: 22px;
	}
	
</style>