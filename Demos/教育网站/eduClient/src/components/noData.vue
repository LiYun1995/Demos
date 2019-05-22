<template>
	<div class="no-data">
		<img src="../assets/images/noData.png"/>
		<div class="no-data-title">还没有数据哦</div>
	</div>
</template>

<script>
export default{
	name:'noData'
}
</script>

<style scoped="scoped">
	.no-data{
		text-align: center;
	}
	.no-data img{
		margin-top: 100px;
		width: 300px;
	}
	.no-data-title{
		margin-top: 24px;
		font-size: 16px;
		margin-bottom: 50px;
	}
</style>