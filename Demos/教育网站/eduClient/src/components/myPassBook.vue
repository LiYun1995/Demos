<template>
	<div>
		<div class="box" v-for="(item,index) in bookList" v-if="bookList.length!=0">
			<canvas :id="'book'+index" width="400px" height="285px">
				<h4>您的浏览器不支持此功能，请使用谷歌浏览器或者IE11及以上版本！</h4>
			</canvas>
			<div class="title">{{item.title}}</div>
		</div>
		<noData v-if="bookList.length==0"/>
	</div>
</template>

<script>
import axios from 'axios'
import noData from '@/components/noData'
export default{
	name: "myPassBook",
	components:{
		noData
	},
	data: function(){
		return {
			bookList:[]
		}
	},
	mounted:function(){
		this.$store.commit('checkFooter');
	},
	created: function(){
		let self = this;
		axios.get('/api/users/specialties/completes').then(function(response){
			if(response.data.meta.code==200){
				self.bookList = new Array();
				response.data.body.list.forEach(function(item){
					let tmpObj = {
						title:item.specialty.name,
						name:self.$store.state.loginState.name,
						content:item.specialty.name,
						time:self.timeToDate(item.specialty.createdDate)
					};
					self.bookList.push(tmpObj);
					//self.showBook();
				});
			}
		});
	},
	updated: function(){
		let now = 0;
			if(now>=this.bookList.length){
				return false;
		}
		var cvs = document.getElementById('book'+now);
    	var imgObj = new Image();
        imgObj.src = require("../assets/images/passbook.jpg");
        var self = this;
        imgObj.onload = function(){
            var ctx = cvs.getContext('2d');
            ctx.scale('250px', '178px');
            ctx.drawImage(this,0,0,855,542,0,0,400,285);
            ctx.font = "12px PingFang-SC-Medium";
			ctx.fillText(self.bookList[now].content,145,170);
			ctx.fillText(self.bookList[now].name,145,192);
			ctx.fillText(self.bookList[now].time,145,214);
            self.showBook(++now);
        }
	},
	methods:{
		showBook: function(){
			let now = 0;
			if(now>=this.bookList.length){
				return false;
			}
			var cvs = document.getElementById('book'+now);
        	var imgObj = new Image();
	        imgObj.src = require("../assets/images/passbook.jpg");
	        var self = this;
	        imgObj.onload = function(){
	            var ctx = cvs.getContext('2d');
	            ctx.scale('250px', '178px');
	            ctx.drawImage(this,0,0,855,542,0,0,400,285);
	            ctx.font = "12px PingFang-SC-Medium";
				ctx.fillText(self.bookList[now].content,145,170);
				ctx.fillText(self.bookList[now].name,145,192);
				ctx.fillText(self.bookList[now].time,145,214);
	            self.showBook(++now);
	        }
		},
		timeToDate: function(time){
			let date = new Date(time)
			return date.getFullYear( )+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"; 
		}
	}
}
</script>

<style scoped="true">
	.box{
		display: inline-block;
		margin: 0px 15px 20px 15px;
	}
	.title{
		text-align: center;
		font-size:16px;
	}
</style>