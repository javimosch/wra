import {call} from '@/plugins/rpcApi';

export async function count() {
	return await get('/api/v2/users/count');
}

export async function me() {
	console.log('/plugins/user/me')
	return await call('getLoggedUser');
}