<template>
	<div>
		<div class="search">
			<div>年度培训：</div>
			<div>
				<select class="select">
					<option value="全部">全部</option>
				</select>
			</div>
			<div class="title">培训结果：</div>
			<div>
				<select class="select">
					<option value="全部">全部</option>
					<option value="培训中">培训中</option>
					<option value="已合格">已合格</option>
					<option value="未合格">未合格</option>
				</select>
			</div>
			<div>
				<button class="search-btn">搜索</button>
			</div>
		</div>
		<div class="myclass-list">
			<div class="box pull-left" v-for="item in myclassList">
				<img class="class-img" :src="item.img"/>
				<div class="class-title">
					{{item.title}}
				</div>
				<div class="class-item">
					培训年度：{{item.year}}
				</div>
				<div class="class-item">
					学时：{{item.time}}
				</div>
				<div class="class-item">
					进度：{{item.progress}}%
				</div>
				<router-link :to="{path:'classStudy',query:{classID:item.classID}}">
					<div class="class-item btn">进班</div>
				</router-link>
			</div>
		</div>
		<div class="clear-fix"></div>
	</div>
</template>

<script>
export default{
	name: 'myClassListC',
	data: function(){
		return {
			myclassList: [
				{title:"关于公布2018年全省住房城乡建设领",year:"2019",classID:"12321",progress:"1",img:"https://lanhu.oss-cn-beijing.aliyuncs.com/psaea0336d01b23914-521c-4de6-ac5a-fa4a3d7f6b94"},
				{title:"关于公布2018年全省住房城乡建设领",time:"2019",classID:"12321",progress:"3",img:"https://lanhu.oss-cn-beijing.aliyuncs.com/psaea0336d01b23914-521c-4de6-ac5a-fa4a3d7f6b94"},
				{title:"关于公布2018年全省住房城乡建设领",time:"2019",classID:"12321",progress:"90",img:"https://lanhu.oss-cn-beijing.aliyuncs.com/psaea0336d01b23914-521c-4de6-ac5a-fa4a3d7f6b94"},
				{title:"关于公布2018年全省住房城乡建设领",time:"2019",classID:"12321",progress:"623",img:"https://lanhu.oss-cn-beijing.aliyuncs.com/psaea0336d01b23914-521c-4de6-ac5a-fa4a3d7f6b94"}
			]
		}
	},
	mounted:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style scoped>
	.search{
		font-size:16px;
		font-weight:500;
		line-height:27px;
		display: table;
		height: 40px;
		margin-bottom: 26px;
	}
	.search div{
		display: table-cell;
		vertical-align: middle;
	}
	.search select{
		height: 40px;
		width: 160px;
	}
	.search .title{
		padding-left: 96px;
	}
	.search .search-btn{
		width:80px;
		height:40px;
		background-color: #1D82D2;
		border-radius:4px;
		color: #FFF;
		border: none;
		margin-left: 10px;
	}
	.myclass-list .class-img{
		width:220px;
		height: 160px;
	}
	.myclass-list .box{
		width:220px;
		border:1px solid #B3B3B3;
		margin-right: 10px;
		padding-bottom: 10px;
		margin-bottom: 20px;
	}
	.myclass-list .class-title{
		font-size:14px;
		font-weight:bold;
		line-height:27px;
		padding-left: 5px;
	}
	.myclass-list .class-item{
		font-size:12px;
		font-weight:bold;
		color: #656565;
		padding-left: 5px;
	}
	.myclass-list .btn{
		font-size:14px;
		color: #FFF;
		line-height: 26px;
		background-color: #1D82D2;
		border: none;
		width: 205px;
		height: 26px;
		border-radius: 6px;
		text-align: center;
		margin-left: 5px;
		margin-top: 5px;
	}
	.myclass-list a{
		text-decoration: none;
	}
</style>