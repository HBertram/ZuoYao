import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import api from '@/api/api.js'
import { uuid } from "@/common/utils.js"
import { EDIT_PAGEDATA, EMPTY_PAGEDATA, SET_USERTOKEN, LOGOUT, SET_USERINFO, SET_VERSIONINFO } from "./mutations_type.js"

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
		userToken: {
		},
		versionInfo: {
		}
	},
	mutations: {
		[SET_USERTOKEN](state, userToken) {
			state.userToken = userToken
		},
		[SET_USERINFO](state, userInfo) {
			state.userInfo = userInfo;
		},
		[SET_VERSIONINFO](state, versionInfo) {
			state.versionInfo = versionInfo;
		},
		[LOGOUT](state) {
			state.userToken = {}
			state.userInfo = {}
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
			return new Promise(
				(resolve, reject) => {
					this.api.login(loginInfo).then((data) => {
						if (!!data && !!data.token) {
							commit(SET_USERTOKEN, data)
							resolve(data)
						} else {
							reject(data)
						}
					})
				}
			)
		},
		getUserInfo({ commit, state }, data) {
			if (!state.userToken || !state.userToken.token) {
				//未登录，游客
				this.api.login({ type: "visitor" }).then(data => {
					commit(SET_USERTOKEN, data)
					//登陆过，直接查询
					this.api.getUserInfoByToken(data.token).then( r => {
						commit(SET_USERINFO, r)
					}).catch(r => {
						commit(SET_USERINFO, {})
					})
				})
			} else {
				//登陆过，直接查询
				this.api.getUserInfoByToken(state.userToken.token).then( r => {
					commit(SET_USERINFO, r)
				}).catch(r => {
					commit(SET_USERTOKEN, {})
				})
			}
		},
		logout({ commit, state }, data) {
			commit(LOGOUT)
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
