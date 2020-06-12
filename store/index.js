import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import api from '@/api/api.js'
import { uuid } from "@/common/utils.js"
import { EDIT_PAGEDATA, EMPTY_PAGEDATA, LOGIN, LOGOUT } from "./mutations_type.js"

Vue.use(Vuex)
Vuex.Store.prototype.uuid = uuid
Vuex.Store.prototype.api = api
const store = new Vuex.Store({
	plugins: [
		persistedState({
			storage: {
				getItem: key => {
					return uni.getStorageSync(key)
				},
				setItem: (key, value) => uni.setStorage({
					key: key,
					data: value
				}),
				removeItem: key => uni.removeStorage({
					key: key
				})
			}
		})
	],
	state: {
		pageData: {},
		/**
		 * 是否需要强制登录
		 */
		userInfo: {
		},
		forcedLogin: false,
		hasLogin: false
	},
	mutations: {
		[LOGIN](state, userInfo) {
			state.userInfo = userInfo || '新用户';
			state.hasLogin = true;
		},
		[LOGOUT](state) {
			state.userName = "";
			state.hasLogin = false;
		},
		[EDIT_PAGEDATA](state, payload) {
			state.pageData = payload
		},
		[EMPTY_PAGEDATA](state) {
			state.pageData = {}
		}
	},
	actions: {
		login({ commit, state }, loginInfo) {
			return this.api.login(loginInfo).then((data) => {
				if (!!data) commit(LOGIN, data)
				return data
			})
		},
		logout({ commit, state }, data) {
			
		},
		editPageData({ commit, state }, data) {
			commit(EDIT_PAGEDATA, data)
		},
		emptyPageData({ commit, state }) {
			commit(EMPTY_PAGEDATA)
		}
	}
})

export default store
