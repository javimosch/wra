import {call} from '@/plugins/rpcApi';
export async function getCurrentUserProjects() {
	return await call('getCurrentUserProjects')
}