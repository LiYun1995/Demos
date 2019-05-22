<template>
	<div>
		学员学习进度达标（即要修课程学习进度达100%）后即可点击“考试”-“进入”即可进入考试
	</div>
</template>

<script>
export default{
	name: 'serviceExam',
	mounted:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style scoped>
</style>