<template>
	<div class="message-board" v-show="messageBordState">
		<div class="box">
			<div class="content">
				<div class="head">
					<span class="pull-left">我要留言</span>
					<span class="pull-right icon" @click="showMessageBoard(false)">×</span>
				</div>
				<div class="body">
					<div>
						<textarea class="textarea" v-model="messageContent"></textarea>
					</div>
					<div>
						<button class="btn" @click="submitMessage()">提交</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default{
	name: 'messageBoard',
	data: function(){
		return {
			messageContent: ''
		}
	},
	computed:{
		messageBordState: function(){
			return this.$store.state.messageBoard;
		}
	},
	methods:{
		showMessageBoard: function(state){
			this.$store.commit('showMessageBoard',state);
		},
		submitMessage: function(){
			let self = this;
			axios({
				url:'/api/messages',
				method:'POST',
				params:{
					content:self.messageContent
				}
			}).then(function(response){
				if(response.data.meta.code==200){
					self.showMessageBoard(false);
					alert('留言成功');
				}else{
					alert(response.data.meta.message);
				}
			});
			
		}
	}
}
</script>

<style scoped="true">
	.message-board{
		position: fixed;
		width: 100%;
		background-color: rgba(0,0,0,0.1);
		height: 100%;
		display: table;
		z-index: 999999;
	}
	.message-board .box{
		display: table-cell;
		vertical-align: middle;
	}
	.message-board .box .content{
		margin: 0px auto;
		background-color: #fff;
		width: 30%;
		height: 320px;
		box-shadow:0px 1px 15px 1px rgba(0,11,17,0.26);
		border-radius:4px;
	}
	.message-board .box .content .head{
		height: 46px;
		background-color: #E5E5E5;
		line-height: 46px;
		font-size:18px;
		font-weight:bold;
		color:#1A1A1A;
		padding: 0px 20px;
		border-radius:4px;
	}
	.message-board .box .content .head .icon{
		font-size: 28px;
		cursor: pointer;
	}
	.message-board .box .content .body{
		text-align: center;
	}
	.message-board .box .content .body .textarea{
		margin: 40px 0px 20px 0px;
		border-radius: 4px;
		height: 150px;
		width: 80%;
		resize: none;
	}
	.message-board .box .content .body .btn{
		background-color:#1D82D2;
		border-radius:4px;
		border: none;
		width: 150px;
		height: 36px;
		color: #FFF;
	}
</style>