<template>
	<div>
		员缴纳费用，后即可进入“学员中心”-“我的班级”选择班级，点击进入具体班级页面。
		<br/>
		如下图所示：
		<br/>
		必修课程由系统自动推送，选修课程需学员手动点击“去选课”选择课程学习。
		<br/>
		班级首页“培训班课程”将列出学员所有所选课程的课程名称、学时、学习进度。学员可选择具体课程点击“开始学习”进入课程播放页面。
		<br/>
		如下图所示
		<br/>
		学员可在课程播放页面右侧切换课件，课件名称将实时记录显示当前课件学习进度。
		<br/>
		如下图所示：
		<br/>

	</div>
</template>

<script>
export default{
	name: 'serviceStudy',
	data: function(){
		return {
			studyOnline: '<h1></h1>'
		}
	},
	mounted:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style scoped>
</style>