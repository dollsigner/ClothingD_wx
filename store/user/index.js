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
	
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}