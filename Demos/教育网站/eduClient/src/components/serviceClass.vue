<template>
	<div>
		学员登录成功后可点击“学员登录”窗口的“报名培训”前往选择班级报名。
		<br/>
		如下图所示：
		<br/>
	</div>
</template>

<script>
export default{
	name: 'serviceClass',
	mounted:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style scoped>
</style>