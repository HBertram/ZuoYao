import axios from 'axios';  
import qs from 'qs';  
import apis from "./apisToRegister"
const API_URL = "http://139.9.200.212:8079/api"
//const API_URL = "http://localhost:8079/api"



const http = axios.create({
	  baseURL: API_URL,
	  timeout: 5000
	})
function getDefaultConfig() {
	return Object.assign({}, http.defaults)
}
	
let loading;  
let isloading = true;  


function registerApis(apis) {
	let api = {}
	for (let apiConfig of apis) {
		if (!apiConfig.name || (!apiConfig.url && !apiConfig.urlFunc)) {
			console.error("api/registerApis ERROR: apiConfig must contains property name and property url")
			continue
		}
		api[apiConfig.name] = async function(param) {
			let config = Object.assign(getDefaultConfig(), apiConfig)
			if ( typeof(config.urlFunc) == "function" ) {
				config.url = config.urlFunc(param)
			}
			if (config.method.toUpperCase() == "POST") {
				config.data = param
			} else {
				config.param = param
			}
			let fullUrl = `${API_URL}/${config.url}`
			config.url = fullUrl
			if ( config.isloading !== false ) {
				isloading = true
				uni.showLoading()
			}
			return new Promise((resolve, reject) => {
				uni.request(config).then((data) => {
					if ( isloading ) {
						uni.hideLoading()
						isloading = false
					}
					let res =  data[1].data
					
					if (res.code == 0) {
						resolve(res.data)
						return 1
					} else {
						console.error(`${config.method} - ${fullUrl} error:
							request:${JSON.stringify(param)}
							response:${JSON.stringify(res)}`)
						if ( !!res.msg ) {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
						}
						reject("访问失败:" + res.msg)
					}
				}).catch((e) => {
				console.error(`error - ${fullUrl}`, e)
				uni.showToast({
					icon: 'none',
					title: '访问服务器异常',
				});
				reject(e)
			})
			})
		}
	}
	return api
}


let api = {
	...registerApis(apis)
}
export default api