import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.RPC_ENDPOINT
});

var actionsCallers = {};

export async function sync() {
	let actions = await call('getRpcActionsSelect');
	actions.forEach(a => {
		actionsCallers[a.text] = (data) => call(a.text, data);
	});
	return {
		actions,
		namesList: actions.map(a => a.text)
	};
}

export function callClient(name,data){
	return call(name,data, {
		url:'client/test'
	})
}

export async function call(name, data, options = {}) {

	if(!options.url) options.url = 'rpc/' + name

	data = data || {};
	try {
		var headers = {}
		if (typeof window !== 'undefined') {
			headers = {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}
		let res = await instance.post(options.url, {
			n: name,
			d: data
		}, {
			headers: headers
		});
		if (res.data) {
			let resData = res.data;
			if (resData.err) {
				throw new Error(resData.err);
			} else {
				if(!process.env.isProduction){
					console.info('WRAKEND CALL',name, JSON.stringify(data),'THEN',resData.data)
				}
				return resData.data;
			}
		}
	} catch (err) {
		if (err.response && err.response.data && err.response.data.err) {

			err = err.response.data.err;
			let msg = err;
			try {
				let json = JSON.parse(msg);
				console.warn(json);
				if (json.message) {
					msg = json.message;
				}
			} catch (err) {}

			if(!process.env.isProduction){
				console.info('WRAKEND CALL',name, JSON.stringify(data),'CATCH',msg)
			}

			throw new Error(msg);

		} else {
			throw err;
		}
	}
}