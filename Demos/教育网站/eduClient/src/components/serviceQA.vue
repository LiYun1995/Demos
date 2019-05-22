<template>
	<div v-html="QA"></div>
</template>

<script>
import axios from 'axios'
export default{
	name: 'serviceQA',
	data: function(){
		return {
			QA: ''
		}
	},
	created:function(){
		let self = this;
		axios.get('/api/qainfos').then(function(response){
			self.QA = response.data.body.qainfo;
		});
	},
	updated:function(){
		this.$store.commit('checkFooter');
	}
}
</script>

<style scoped>
</style>