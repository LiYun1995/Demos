<template>
	<div>
		<h3>1、学员注册</h3>
		首次使用本平台学员需进行新用户注册操作手机号注册。
		<br/>
		学员需在首页登录窗口选择“学员登录”然后点击“注册”图标，填写注册信息，注册成功后学员即可使用手机号登录。
		<br/>
		如下图所示：
		<br/>
		<br/>
		<h3>2、单位管理员注册</h3>
		首次使用本平台单位管理员需进行新用户注册操作。
		<br/>
		单位管理员需在首页登录窗口选择“单位管理员登录”然后点击“注册”图标，填写注册信息，注册成功后单位管理即可手机号登录。
		<br/>
		单位管理员注册信息提交后，由系统平台方审核通过后方可进行单位管理员集体操作。
		<br/>
		如下图所示：
		<br/>

	</div>
</template>

<script>
export default{
	name: 'serviceRegister',
	mounted:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style scoped>
</style>