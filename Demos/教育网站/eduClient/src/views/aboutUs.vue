<template>
	<div class="main-box">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>首页>></span>
			</span>
			<span>关于我们</span>
		</div>
		<div class="about-us">
			<div class="title">关于我们</div>
			<div class="content" v-if="newsContent" v-html="newsContent"></div>
			<noData v-if="!newsContent"/>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import noData from '@/components/noData'
export default{
	name: 'aboutUs',
	components:{
		noData
	},
	data: function(){
		return {
			newsContent:false
		}
	},
	created: function(){
		let self = this;
		axios.get('/api/abouts').then(function (response) {
			self.newsContent = response.data.body.about;
		});
		this.$store.commit('checkFooter');
		this.$store.state.activeMenu = 'aboutUs';
	},
	updated:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style>
	.about-us .title{
		font-size: 26px;
		font-weight:bold;
		border-bottom: 1px #B2B2B2 solid;
		padding: 25px 0px;
		text-align: center;
		margin-bottom: 22px;
	}
	.about-us .content{
		margin-bottom: 46px;
		width: 100%;
	}
	.about-us img{
		display: inline !important;
	}
	.main-box .top{
		display: table;
		font-size:14px;
		height:20px;
	}
	.main-box .top img{
		width:18px;
		height:20px;
		margin-right: 12px;
	}
	.main-box .top span{
		display: table-cell;
		vertical-align: middle;
	}
	.main-box .top .back{
		color: #1D82D2;
	}
</style>