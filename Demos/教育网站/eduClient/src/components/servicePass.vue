<template>
	<div>
		培训通过后，在"学员中心"-"培训证明"会生成培训通过证明。
	</div>
</template>

<script>
export default{
	name: 'servicePass',
	mounted:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style scoped>
</style>