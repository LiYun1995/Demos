<template>
	<div class="head-notes">
		<div class="head-notes-box">
			<img class="head-notes-icon" src="@/assets/images/headNotes.png" />
			<div class="head-notes-list-box">
				<ul class="head-notes-list" v-for="(notes,key) in noteList">
					<li v-show="key==showItem"><router-link :to="'/learnNotesDetail?notesID='+notes.id">{{notes.title}}</router-link></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default{
	name: 'headNotes',
	data:function(){
		return {
			noteList: '',
			showItem: ''
		}
	},
	created:function(){
		this.showItem = 0;
		let self = this;
		axios.get('/api/notifications/top/6').then(function(response){
			self.noteList = response.data.body.notifications;
		});
		setInterval(this.showNotes,5000);
	},
	methods:{
		showNotes:function(){
			this.showItem++;
			if(this.showItem==this.noteList.length){
				this.showItem = 0;
			}
		}
	}
}
</script>

<style scoped>
	.head-notes{
		background-color: #E4E4E4;
		height: 36px;
		line-height: 35px;
	}
	.head-notes-box{
		width: 1140px;
		margin: 0px auto;
	}
	.head-notes-icon{
		margin-top: 8px;
		float: left;
		width: 20px;
		height: 20px;
	}
	.head-notes-list-box{
		float: left;
		margin-left: 8px;
	}
	.head-notes-list{
		list-style: none;
	}
	@media only screen and (max-width: 1750px) {
		.head-notes-box{
			width: 84%;
		}
	}
	@media only screen and (max-width: 1600px) {
		.head-notes-box{
			width: 87%;
		}
	}
	@media only screen and (max-width: 1450px) {
		.head-notes-box{
			width: 96%;
		}
	}
	li a{
		text-decoration: none;
		color: #333;
		font-size: 14px;
	}
</style>