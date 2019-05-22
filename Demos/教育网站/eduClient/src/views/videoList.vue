<template>
	<div class="main-box">
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>我的班级>></span>
			</span>
			<span>在线学习</span>
		</div>
		<div class="class-title">{{classTitle}}</div>
		<div class="video-box">
			<div class="video">
				<img v-show="sectionId==0" :src="coverImg" class="video-cover"/>
				<div id="video"></div>
			</div>
			<div class="menu">
				<div v-for="(item,index) in videoList">
					<div class="chapters">{{(index+1)}}.{{item.name}}</div>
					<div :class="{active:(sectionId==sitem.id)}" class="juncture" @click="watchVideo(sitem.id,sitem.src,sitem.process)" v-for="(sitem,sindex) in item.sectionList">
						<div class="title">{{sindex+1}}.{{sitem.name}}</div>
						<div class="process pull-right">{{(sitem.process*100).toFixed(2)}}%</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {commonJs} from '@/util/commonJs'
export default{
	name: 'videoList',
	data:function(){
		return {
			videoList:[],
			sectionId:0,
			sectionProgress:0,
			sectionMaxProgress:0,
			coverImg:null,
			player: null,
			classTitle:null,
			timeHandl:null
		}
	},
	updated:function(){
		this.$store.commit('checkFooter');
	},
	created: function(){
		this.getVideoList();
		let self = this;
		axios.get('/api/courses/'+self.$route.query.classID).then(function(response){
			if(response.data.meta.code==200){
				self.coverImg = self.$store.state.resourceDomain+response.data.body.detail.coverPath;
				self.classTitle = response.data.body.detail.name;
			}
		});
		commonJs.checkPremission(this,'person');
		this.$store.state.activeMenu = 'noActive';
	},
	methods: {
		watchVideo: function(videoId,videoSrc,process){
			//解绑事件
			if(this.player){
				$('#classVideo').unbind();
			}
			this.endProgressUpdate();
			this.startProgressUpdate();
			//初始化控件值
			this.sectionId = videoId;
			this.sectionMaxProgress = process;
			this.showVideo(videoSrc);
		},
		showVideo: function(videoSrc){
			let self = this;
			//建立对象
			$('#video').html('<video style="width:100%;height:450px" id="classVideo" controls="controls" controlslist="nodownload" src="'+self.$store.state.resourceDomain+videoSrc+'"></video>');
			//捕获对象
			self.player = $('#classVideo').get(0);
			self.player.poster = self.coverImg;
			self.player.addEventListener('seeking',function(){
				self.endProgressUpdate();
				//浏览器限制不能暂停和播放同时进行
				self.player.pause();
				if((self.player.currentTime/self.player.duration).toFixed(4)>self.sectionMaxProgress){
					self.player.currentTime = self.sectionMaxProgress * self.player.duration;
				}
				//浏览器限制不能暂停和播放同时进行
				setTimeout(function(){
					self.player.play();
					self.startProgressUpdate();
				},300);
			});
			self.player.addEventListener('ended',function(){
				//播放完毕上报进度
				self.progressUpdate();
				self.endProgressUpdate();
			});
			//3秒上传一次进度
			
		},
		endProgressUpdate: function(){
			clearInterval(this.timeHandl);
		},
		startProgressUpdate: function(){
			let self = this;
			self.endProgressUpdate();
			this.timeHandl = setInterval(function(){
				self.progressUpdate();
			},3000);
		},
		progressUpdate: function(){
			let self = this;
			this.sectionProgress = (this.player.currentTime/this.player.duration).toFixed(4);
			if(this.sectionProgress>this.sectionMaxProgress){
				this.sectionMaxProgress = this.sectionProgress;
			}
			axios({
				url:'/api/sections/progress/usersections/'+this.sectionId,
				params:{
					progress:this.sectionProgress
				},
				method:'POST'
			}).then(function(){
				//修改菜单里面的进度
				self.videoList.forEach(function(item,index){
					item.sectionList.forEach(function(value,sindex){
						if(value.id==self.sectionId){
							value.process = self.sectionProgress<self.sectionMaxProgress?self.sectionMaxProgress:self.sectionProgress;
						}
					});
				});
			});
		},
		getVideoList: function(){
			let self = this;
			let tmpVideoList = new Array();
			axios.get('/api/chapters/userCourses/'+self.$route.query.uclassID).then(function(response){
				if(response.data.meta.code==200){
					response.data.body.items.forEach(function(item){
						let chapterObj = {
							name: item.chapter.notes,
							sectionList:[]
						}
						axios.get('/api/sections/userChapters/'+item.id).then(function(res){
							if(res.data.meta.code==200){
								res.data.body.items.forEach(function(value){
									let sectionObj = {
										process:0,
										id:0,
										src:'',
										name:''
									}
									sectionObj.process = value.progress;
									sectionObj.id = value.id;
									sectionObj.src = value.section.videoPath;
									sectionObj.name = '课程小节';
									chapterObj.sectionList.push(sectionObj);
								});
							}
						});
						tmpVideoList.push(chapterObj);
					});
					self.videoList = tmpVideoList;
				}
			});
		}
	}
}
</script>

<style scoped>
	.top{
		display: table;
		font-size:14px;
		height:20px;
	}
	.top img{
		width:18px;
		height:20px;
		margin-right: 12px;
	}
	.top span{
		display: table-cell;
		vertical-align: middle;
	}
	.top .back{
		color: #1D82D2;
	}
	.class-title{
		border-left: 6px solid #1D82D2;
		font-size:18px;
		line-height: 27px;
		margin: 20px 0px 28px 0px;
		padding-left: 6px;
	}
	.video-box{
		width: 100%;
		height: 450px;
		margin-bottom: 60px;
	}
	.video-box .video {
		width: 70%;
		height: 450px;
		float: left;
		margin-right: 2%;
	}
	.video-box #video{
		height: 450px;
	}
	.video-cover{
		text-align: center;
		margin: 0px auto;
		height: 450px;
	}
	
	.video-box .menu{
		float: left;
		width: 25%;
		padding-right: 3%;
		overflow-y: scroll;
		height: 450px;
	}
	
	.video-box .menu .chapters{
		font-size: 18px;
		font-weight: bold;
	}
	.video-box .menu .juncture{
		font-size: 16px;
		display: inline-block;
		border-bottom: 1px #EEE dashed;
		padding: 10px 15px;
		margin-top: 10px;
		width: 100%;
		cursor: pointer;
	}
	.video-box .menu .juncture .title{
		display: inline-block;
		word-break: break-all;
		width: 80%;
	}
	.video-box .menu .juncture .process{
		display: inline-block;
		width: 18%;
	}
	.video-box .menu .active{
		color: #FFF;
		background-color: #424347;
	}
</style>