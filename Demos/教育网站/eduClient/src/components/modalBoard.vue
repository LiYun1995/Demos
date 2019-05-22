<template>
	<div class="message-board" v-show="modalBordState" @click="hideModal()">
		<div class="box">
			<div class="content">
				<div class="head">
					<span class="pull-left">{{modalTitle}}</span>
					<span class="pull-right icon" @click="hideModal()">×</span>
				</div>
				<div class="body">
					{{modalContent}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	props:['modalTitle','modalContent'],
	name: 'modalBoard',
	data: function(){
		return {
			modalBordState: true,
			messageContent: ''
		}
	},
	methods:{
		showModal: function(){
			this.modalBordState = true;
		},
		hideModal: function(){
			this.modalBordState = false;
		}
	}
}
</script>

<style scoped="true">
	.message-board{
		top:0px;
		left:0px;
		position: absolute;
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
		padding: 20px;
		font-size: 22px;
	}
</style>