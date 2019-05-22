import axios from 'axios'
let commonJs = {
	checkLoginInfo: function(self){
		axios.get('/api/users/loginuser').then(function(response){
			if(response.data.meta.message=='需要授权的访问'){
				let status = {
					state:false,
					phone:false,
					type:false,
					identification: false,
					name: false
				};
				self.$store.commit('setUserLoginInfo',status);
			}
		});
		self.$store.commit('checkUserLogin');
	},
	checkPremission: function(self,loginType){
		this.checkLoginInfo(self);
		if(!self.$store.state.loginState.state){
			self.$router.push({path:"/"});
		}else{
			if(self.$store.state.loginState.type!=loginType){
				self.$router.push({path:"/"});
			}
		}
	},
	logout:function(self){
		axios.get('/api/users/logout').then(function(){
			let status = {
				state:false,
				phone:false,
				type:false,
				identification: false,
				name: false
			};
			self.$store.commit('setUserLoginInfo',status);
			self.$router.push({path:"/"});
		});
	}
}
export { commonJs }