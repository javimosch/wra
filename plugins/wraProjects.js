import {call} from '@/plugins/rpcApi';
export async function getCurrentUserProjects(auth) {
	let query = {
		$or: [{
			user: auth.user && auth.user._id
		}, {
			session: auth.session && auth.session._id
		}]
	}

	if (auth.user && auth.user.role === 'root') {
		query = {};
	}

	let arr = await call('findPaginate', {
		model: 'wra_project',
		select: [
			'_id',
			'name',
		],
		query: query,
		transform: [
			'_id:_id',
			'name:name'
		]
	})
	return arr.map(d => {
		return d
	})
}