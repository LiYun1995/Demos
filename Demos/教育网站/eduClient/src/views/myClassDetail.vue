<template>
	<div class="main-box">
		<alertBoard ref="alertBoard"/>
		<div class="top">
			<span class="back">
				<span>
					<img src="../assets/images/newsType.png" />
				</span>
				<span>我的班级>></span>
			</span>
			<span>学习进度</span>
		</div>
		<div class="tool-bar">
			<div @click="enterDetail()"><div :class="{active:displayType=='detail'}" class="person">培训班课程</div></div>
			<div @click="enterExam()"><div :class="{active:displayType=='exam'}" class="person">考试</div></div>
		</div>
		<div class="class-title">{{specialtyTitle}}</div>
		<div v-if="displayType=='detail'">
			<classProcess :userExam="userExam" :process="process"/>
		</div>
		<div v-if="displayType=='exam'">
			<classExam/>
		</div>
	</div>
</template>

<script>
import alertBoard from '@/components/alertBoard'
import classProcess from '../components/classProcess'
import classExam from '../components/classExam'
import axios from 'axios'
import {commonJs} from '@/util/commonJs'
export default{
	name: 'myClassDetail',
	components:{
		classProcess,classExam,alertBoard
	},
	data: function(){
		return {
			displayType:'detail',
			specialtyTitle:'',
			requiredExam:'',
			userExam:'',
			process:''
		}
	},
	created: function(){
		commonJs.checkPremission(this,'person');
		let self = this;
		axios.get('/api/users/learn/infos/specialties/'+this.$route.query.classID).then(function(response){
			if(response.data.meta.code==200){
				let data = response.data.body;
				self.userExam = data.userSpecialtyInfo.userExam;
				self.specialtyTitle = data.userSpecialtyInfo.userSpecialty.specialty.name;
				self.process = data.userSpecialtyInfo.userSpecialty.progress;
				self.requiredExam = data.userSpecialtyInfo.userSpecialty.specialty.requiredExam;
			}
		});
		this.$store.state.activeMenu = 'noActive';
	},
	methods:{
		enterDetail: function(){
			this.displayType = 'detail';
		},
		enterExam: function(){
			if(this.requiredExam){
				if(this.userExam.passed){
					this.showAlert('本课程已通过！');
					return false;
				}
				if(this.process==1){
					this.displayType = 'exam';
				}else{
					this.showAlert('课程总进度达100%才可参与考试哦！');
				}
			}else{
				this.showAlert('本课程不需要考试！');
			}
		},
		showAlert: function(message){
			this.$refs.alertBoard.showModal(message);
		}
	},
	updated:function(){
		this.$store.commit('checkFooter');
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
	.tool-bar{
		line-height: 52px;
		border-bottom: 1px #CCCCCC solid;
	}
	.tool-bar .person,.register-person .tool-bar .company{
		font-size: 22px;
		font-weight: bold;
		width: 150px;
		text-align: center;
		cursor: pointer;
	}
	.tool-bar .active{
		border-bottom: 4px #1D82D2 solid;
		color: #1D82D2;
	}
	.tool-bar a{
		color: #000;
	}
	.tool-bar div{
		display: inline-block;
	}
	.class-title{
		border-left: 6px solid #1D82D2;
		font-size:18px;
		line-height: 27px;
		margin: 20px 0px 28px 0px;
		padding-left: 6px;
	}
</style>