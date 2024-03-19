import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
Vue.use(Vuex)

import user from './user'


const debug = process.env.NODE_ENV === 'development' // 开发环境

const store = new Vuex.Store({
	modules: {
		user
	},
	strict: true, // true 严格使用 mutations 改变 state
	plugins: debug ? [createLogger()] : [] // 开发模式使用日志 非开发不使用
})

export default store