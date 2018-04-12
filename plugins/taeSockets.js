import io from 'socket.io-client';
import {
	call
} from '@/plugins/rpcApi';


export async function getRoomSocket(roomName,prepareRoomAction) {
	if(prepareRoomAction){
		await call(prepareRoomAction);
	}
	return await (new Promise((resolve, reject) => {
		let socket = io(process.env.RPC_ENDPOINT + `${roomName}`, {
			autoConnect: true
		});
		socket.on('connect', function() {
			resolve(socket)
			let done = true;
		});
		//socket.open();
	}));
}

var watchProjectSocketInstance = null
export async function watchProjectSocket(project, options) {
	if (!project || process.server) {
		return
	}
	let socket = watchProjectSocketInstance;
	if (socket !== null) {

		socket.close();
	}
	await call('taeEnsureProjectSocketRoom', {
		project
	});
	socket = io(process.env.RPC_ENDPOINT + `project/${project}`, {
		autoConnect: false
	})
	socket.open();
	socket.on('connect', function() {

		socket.on('taeSendError', (r) => options.onError(r));
	})
	socket.on('disconnect', function() {

	})
	watchProjectSocketInstance = socket;
	return () => {
		if (watchProjectSocketInstance !== null) {
			watchProjectSocketInstance.close();
		}
	}
}