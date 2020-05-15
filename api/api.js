import localApi from "./local/api.js"
import serverApi from "./server/api.js"

let api = {
	_server_ip: "",
	_store_type: "local",
}
Object.assign(api, localApi, serverApi)
export default api