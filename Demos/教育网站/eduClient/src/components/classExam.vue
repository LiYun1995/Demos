<template>
	<div class="exam-list">
		<div class="title-box">
			<div class="type">
				<img class="type-icon" src="../assets/images/classDetailDescription.png"/>
				<div>单选题</div>
			</div>
		</div>
		<div class="exam-box" v-for="(item,index) in oneAnswer">
			<div class="select-question exam-question" :questionID="item.id"><div class="title-type one-answer">单选题</div><div class="title-question">{{index+1}}.{{item.question}}</div></div>
			<div v-for="(itemAnswer,indexAnswer) in item.answerArr">
				<div class="exam-answer" @click="selectOnlyAnswer">
					<input :value="itemAnswer.id" type="radio" :name="'question'+index"/>
					{{englishStr[indexAnswer]}}.{{itemAnswer.answerItem}}
				</div>
			</div>
		</div>
		<div class="title-box">
			<div class="type">
				<img class="type-icon" src="../assets/images/classDetailDescription.png"/>
				<div>多选题</div>
			</div>
		</div>
		<div class="exam-box" v-for="(item,index) in moreAnswer">
			<div class="select-question exam-question" :questionID="item.id"><div class="title-type more-answer">多选题</div><div class="title-question">{{index+1}}.{{item.question}}</div></div>
			<div v-for="(itemAnswer,indexAnswer) in item.answerArr">
				<div class="exam-answer" @click="selectAnswer">
					<input :value="itemAnswer.id" type="checkbox" :name="'question'+index"/>
					{{englishStr[indexAnswer]}}.{{itemAnswer.answerItem}}
				</div>
			</div>
		</div>
		<div class="title-box">
			<div class="type">
				<img class="type-icon" src="../assets/images/classDetailDescription.png"/>
				<div>判断题</div>
			</div>
		</div>
		<div class="exam-box" v-for="(item,index) in tfAnswer">
			<div class="tf-question exam-question" :questionID="item.id"><div class="title-type tf-answer">判断题</div><div class="title-question">{{index+1}}.{{item.question}}</div></div>
			<div v-for="(itemAnswer,indexAnswer) in item.answerArr">
				<div class="exam-answer" @click="selectOnlyAnswer">
					<input :value="itemAnswer.answer" type="radio" :name="'question'+index"/>
					{{englishStr[indexAnswer]}}.{{itemAnswer.answerItem}}
				</div>
			</div>
		</div>
		<div class="submit">
			<button class="submit-btn" @click="submit()">交卷</button>
		</div>
		<alertBoard ref="alertBoard"/>
	</div>
</template>

<script>
import axios from 'axios'
import alertBoard from '@/components/alertBoard'
export default{
	name: 'classExam',
	components:{
		alertBoard
	},
	data: function(){
		return {
			englishStr:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			oneAnswer:'',
			moreAnswer:'',
			tfAnswer:'',
			testPaperId:0
		}
	},
	created:function(){
		let self = this;
		self.oneAnswer = new Array();
		self.moreAnswer = new Array();
		self.tfAnswer = new Array();
		axios.get('/api/testpapers/specialties/'+self.$route.query.classID).then(function(response){
			if(response.data.meta.code==200){
				self.testPaperId = response.data.body.item.id;
				axios.get('/api/questiones/testpapers/'+response.data.body.item.id).then(function(res){
					res.data.body.questions.forEach(function(item){
						let tmpObj = {
							id:item.id,
							question:item.subject,
							score:item.score,
							answerArr:''
						};
						if(item.type=='singleSelected'){
							tmpObj.answerArr = item.options;
							self.oneAnswer.push(tmpObj);
						}else if(item.type=='multipleSelected'){
							tmpObj.answerArr = item.options;
							self.moreAnswer.push(tmpObj);
						}else{
							let tmpArr = [{
								answer:'yes',
								answerItem:'正确'
							},{
								answer:'no',
								answerItem:'错误'
							}];
							tmpObj.answerArr = tmpArr;
							self.tfAnswer.push(tmpObj);
						}
					});
				});
			}
		});
	},
	updated:function(){
		this.$store.commit('checkFooter');
	},
	methods:{
		submit: function(){
			let self = this;
			if(this.checkSubmit()){
				let selectArr = new Array();
				let tfArr = new Array();
				$('.select-question').each(function(){
					//获取问题元素
					let selectQuestion = this;
					let tmpObj = {
						"questionId": $(selectQuestion).attr('questionID'),
						"requestOptions": []
					}
					//获取答案元素
					$(selectQuestion).parent().find('input[isSelected="yes"]').each(function(){
						let selectAnswer = this;
						let tmpAnswer = {
							"selectedQuestionItemId": $(selectAnswer).val()
						}
						tmpObj.requestOptions.push(tmpAnswer);
					});
					selectArr.push(tmpObj);
				});
				$('.tf-question').each(function(){
					//获取问题元素
					let tfQuestion = this;
					let tmpObj = {
						"questionId": $(tfQuestion).attr('questionID'),
						"answer": []
					}
					//获取答案元素
					$(tfQuestion).parent().find('input[isSelected="yes"]').each(function(){
						tmpObj.answer = $(this).val()=="yes" ? true : false;
					});
					tfArr.push(tmpObj);
				});
				//组包
				let answerArr = {
					requestJudges:tfArr,
					requestSelectes:selectArr,
					testPaperId:self.testPaperId
				}
				axios({
					url:'/api/exams',
					method:'POST',
					data:answerArr
				}).then(function(response){
					if(response.data.meta.code==200){
						self.showAlert('交卷成功，请在课程页面查看是否通过');
						setTimeout(function(){
							window.location.reload();
						},3000);
					}else{
						self.showAlert(response.data.meta.message);
					}
				});
			}
		},
		checkSubmit:function(){
			let check = true;
			let questionNum = 0;
			$('.exam-box').each(function(ele){
				if(!$(this).find('input[isSelected="yes"]').length){
					check = false;
					questionNum = ele + 1;
				}
			});
			if(!check){
				this.showAlert('第'+questionNum+'题还没做，请做完再交卷！');
			}
			return check;
		},
		selectAnswer(object){
			let target = object.target;
			if($(target).children('input').attr('isSelected')){
				$(target).children('input').removeAttr('isSelected');
				$(target).removeClass('active');
			}else{
				$(target).children('input').attr('isSelected','yes');
				$(target).addClass('active');
			}
		},
		selectOnlyAnswer(object){
			let target = object.target;
			$(target).parents('.exam-box').find('input').removeAttr('isSelected');
			$(target).parents('.exam-box').find('.exam-answer').removeClass('active');
			$(target).children('input').attr('isSelected','yes');
			$(target).addClass('active');
		},
		showAlert: function(message){
			this.$refs.alertBoard.showModal(message);
		}
	}
}
</script>

<style scoped>
	.title-box{
		border-bottom: 1px #DDD solid;
		margin-bottom: 16px;
	}
	.title-type{
		display: inline-block;
		color:#FFF;
		font-size: 14px;
		width: 70px;
		text-align: center;
		line-height: 26px;
		border-radius: 4px;
		margin-right: 6px;
	}
	.one-answer{
		background-color: #3CC6F4;
	}
	.more-answer{
		background-color: #6699FF;
	}
	.tf-answer{
		background-color: #3399FF;
	}
	.title-question{
		display: inline-block;
	}
	.type{
		display: table;
		font-size: 18px;
		color:#1D82D2;
		font-weight:bold;
		margin: 35px 0px 10px 0px;
	}
	.type img{
		width: 24px;
		height: 24px;
		margin-right: 5px;
	}
	.type img,.type div{
		display: table-cell;
		vertical-align: middle;
	}
	.exam-list{
		margin-bottom: 60px;
	}
	
	.exam-box{
		box-shadow: 0px 0px 10px #CCC;
		margin: 10px 0px;
		padding: 20px 20px;
		border-radius: 4px;
	}
	.exam-box .exam-question{
		font-size: 18px;
		margin-bottom:10px;
	}
	.exam-box .exam-answer{
		font-size: 16px;
		cursor: pointer;
		color: #222;
	}
	.exam-box .exam-answer input{
		display: none;
	}
	.submit{
		text-align: center;
		margin: 20px 0px;
	}
	.submit-btn{
		background-color: #1D82D2;
		color: #FFF;
		width: 80px;
		height: 40px;
		border-radius: 6px;
		border: none;
		cursor: pointer;
	}
	.exam-answer{
		padding: 10px 0px;
	}
	.exam-box .active{
		background-color: #EEE;
	}
	.answer-hidden{
		display: none;
	}
</style>