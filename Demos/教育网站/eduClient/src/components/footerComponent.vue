<template>
	<div>
		<!--<div class="footer-box" :class="{'footer-short': shortFooter}">
			<div class="footer-content">
				<div class="footer-box-cell">
					<div class="footer-box-item">主办单位：巴蜀教育咨询股份有限公司</div>
					<div class="footer-box-item">公司地址：成都市金牛区实业街59号附25号3、5楼、11楼</div>
				</div>
				<div class="footer-box-cell">
					<div class="footer-box-item">© 2019 巴蜀教育咨询股份有限公司 版权所有</div>
					<div class="footer-box-item"><a href="http://www.miitbeian.gov.cn">网站备案：蜀ICP备19006304号-2</a></div>
				</div>
				<div class="footer-box-cell">
					<div class="footer-qrcode-box">
						<img class="footer-qrcode" src="@/assets/images/qrcode.png" />
						<div class="footer-qrcode-title">四川省建设岗培注册中心</div>
					</div>
					<div class="footer-qrcode-box">
						<img class="footer-qrcode" src="@/assets/images/qrcode.png" />
						<div class="footer-qrcode-title">四川省建设岗培注册中心</div>
					</div>
				</div>
				<div class="clear-fix"></div>
			</div>
		</div>-->
		<div style="margin-top: 50px;">
			<div class="footer-box" :class="{'footer-short': shortFooter}">
				<div class="footer-content">
					<div class="footer-box-cell" style="width:40%">
						<a target="_blank" href="http://www.scbuilder.com">
							<div class="friend-link-cell">
								▍&nbsp;&nbsp;四川建设人才网
							</div>
						</a>
						<a target="_blank" href="http://www.sczwfw.gov.cn/app/main?areaCode=510000000000&flag=1">
							<div class="friend-link-cell">
								▍&nbsp;&nbsp;四川政务服务网
							</div>
						</a>
						<a target="_blank" href="http://www.sccin.com">
							<div class="friend-link-cell">
								▍&nbsp;&nbsp;四川建设网
							</div>
						</a>
						<a target="_blank" href="http://jtt.sc.gov.cn">
							<div class="friend-link-cell">
								▍&nbsp;&nbsp;四川省交通运输厅
							</div>
						</a>
						<a target="_blank" href="http://www.sc.hrss.gov.cn">
							<div class="friend-link-cell">
								▍&nbsp;&nbsp;四川省人力资源和社会保障厅
							</div>
						</a>
						<a target="_blank" href="http://cdhrss.chengdu.gov.cn">
							<div class="friend-link-cell">
								▍&nbsp;&nbsp;成都市人力资源和社会保障局
							</div>
						</a>
						<a target="_blank" href="http://www.cpta.com.cn">
							<div class="friend-link-cell">
								▍&nbsp;&nbsp;中国人事考试网
							</div>
						</a>
						<a target="_blank" href="http://www.scrsw.net">
							<div class="friend-link-cell">
								▍&nbsp;&nbsp;四川人事网
							</div>
						</a>
						<a target="_blank" href="http://jst.sc.gov.cn">
							<div class="friend-link-cell">
								▍&nbsp;&nbsp;四川省住房和城乡建设厅
							</div>
						</a>
					</div>
					<div class="footer-box-cell foot-logo">
						<img style="width: 185px;" src="../assets/images/footLogo.png" />
					</div>
					<div class="footer-box-cell" style="text-align: right;width: 40%;">
						<div class="footer-box-item">公司地址：成都市金牛区实业街59号附25号3、5楼、11楼</div>
						<div class="footer-box-item">主办单位：巴蜀教育咨询股份有限公司</div>
						<div class="footer-box-item"><a href="http://www.miitbeian.gov.cn">网站备案：蜀ICP备19006304号-2</a></div>
						<div class="footer-box-item">© 2019 巴蜀教育咨询股份有限公司 版权所有</div>
					</div>
					<div class="clear-fix"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'footerComponent',
	computed:{
		shortFooter: function(){
			return this.$store.state.shortFooter;
		}
	}
}
</script>

<style>
.footer-box{
	background-color: #35444C;
	color: #FEFEFE;
}
.footer-short{
	position: fixed;
	bottom: 0px;
	width: 100%;
}
.footer-box-cell{
	margin-top: 22px;
	float: left;
}
.footer-box-cell a{
	color: #FFF;
}
.friend-link-cell{
	margin-top: 10px;
	width: 50%;
	float: left;
}
.footer-content{
	width: 1440px;
	margin: 0px auto;
	font-size: 14px;
}
.footer-qrcode-box{
	float: left;
	width: 50%;
	text-align: center;
}
.footer-qrcode{
	width: 80px;
	height: 80px;
}
.footer-qrcode-title{
	font-size: 12px;
}
.footer-box-item{
	margin-top: 12px;
}
.footer-box-item a{
	color: #FFF;
	text-decoration: none;
}
.foot-logo{
	text-align: center;
	width: 20%;
	border-left: 1px rgba(255,255,255,0.3) solid;
	border-right: 1px rgba(255,255,255,0.3) solid;
	margin: 22px -1px;
	padding-top: 10px;
	padding-bottom: 10px;
}
@media only screen and (max-width: 1750px) {
	.footer-content{
		width: 84%;
	}
}
@media only screen and (max-width: 1600px) {
	.footer-content{
		width: 87%;
	}
}
@media only screen and (max-width: 1450px) {
	.footer-content{
		width: 96%;
	}
}
</style>