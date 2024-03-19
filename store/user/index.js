import { reqTest } from '@/api/index.js'

const state = {
	userInfo: {	
		userId: "",
		userRole: "",
		userName: "",
		userAvatar: "",
		userIntroduction: "",
	}
}
const mutations = {
	setUserInfo(state,{userId,userRole,userName,userAvatar,userIntroduction})
	{
		state.userId = userId;
		state.userRole = userRole;
		state.userAvatar = userAvatar;
		state.userIntroduction = userIntroduction;
	}
}
const actions = {
	helloTest({state}) {
		reqTest().then(res => {
			console.log(JSON.stringify(res.data));
		}).catch(err => {
			console.log(JSON.stringify(err));
		});
	}
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}