import axios from 'axios'
import {
	client as createWrapkendClient
} from 'wrapkend-cli'
import _ from 'lodash'

const wrapkend = createWrapkendClient('9OgXLVePIbhXZtplwiASlgXqQuNCMgrrQeXOe9ll');

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

export function callClient(name, data) {
	//delete data.$project;
	//return wrapkend(name,data)

	return call(name, data, {
		url: 'client/no-api-key'
	})
}

export async function call(name, data, options = {}) {

	if (!options.url) options.url = 'rpc/' + name

	data = data || {};
	try {
		var headers = {}
		if (typeof window !== 'undefined') {
			headers = {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}

		var axiosConfig = {
			headers: headers
		};

		var axiosPayload = {
			n: name,
			d: data
		};

		if (options.isMultipart) {
			var multipartKey = options.multipartKey || 'file'
			if (!data[multipartKey]) {
				throw new Error(multipartKey + ' key required (multipartKey)')
			}
			axiosConfig.headers['content-type'] = 'multipart/form-data'
			const formData = new FormData();
			var normalData = _.omit(data, multipartKey)
			formData.append(multipartKey, data[multipartKey])
			console.log('Adding form-data file field', multipartKey, data[multipartKey].name)
			for (var key in normalData) {
				formData.append('d.' + key, normalData[key])
				console.log('Adding form-data field', key, normalData[key])
			}
			formData.append('n',name)
			data[multipartKey] = '[FILE '+data[multipartKey].name+']'
			try{
				formData.append('d',JSON.stringify(data))
			}catch(err){
				throw new Error('Unable to stringify payload')
			}
			axiosPayload = formData
		}

		let res = await instance.post(options.url, axiosPayload, axiosConfig);
		if (res.data) {
			let resData = res.data;
			if (resData.err) {
				throw new Error(resData.err);
			} else {
				if (!process.env.isProduction) {
					console.info('WRAKEND CALL', name, JSON.stringify(data), 'THEN', resData.data)
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

			if (!process.env.isProduction) {
				console.info('WRAKEND CALL', name, JSON.stringify(data), 'CATCH', msg)
			}

			throw new Error(msg);

		} else {
			throw err;
		}
	}
}