<template>
	<div>
		1、个人报名缴费
		<br/>
		学员选择班级后点击“立即报名”即可预约下单，然后前往提示地址缴费。
		<br/>
		如下图所示：
		<br/>
		2、单位集体报名缴费：
		<br/>
		选择单位集体报名缴费的用户需先在平台注册为单位管理员后，方可登录单位管理员角色进行单位集体报名预约操作，然后然后前往提示地址缴费。
		<br/>
		人员管理：
		<br/>
		单位管理员可在此维护本单位人员基本信息。
		<br/>
		报名管理：
		<br/>
		步骤一：创建缴费批次
		<br/>
		单位管理员创建交费批次后即可往批次添加学员
		<br/>
		如下图所示：
		<br/>

	</div>
</template>

<script>
export default{
	name: 'serviceMoney',
	mounted:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style scoped>
</style>