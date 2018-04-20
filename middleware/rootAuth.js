import {call} from '@/plugins/rpcApi';
export default async function({
	store,
	error,
	client,
	redirect,
	route
}) {
	if(process.server){
		return;
	}
	const isLogged = (await call('taeIsLogged')).isLogged;
	if(isLogged){
		store.dispatch('auth/update')
	}
	console.log('taeIsLogged',isLogged);
	if(!isLogged){
		console.log('Redirect to login',route)
		redirect('/admin/login')
	}
}