export function startParallax(selector){
	if(process.server)return;
	if(window.innerWidth<992) return;
	try{
		new Rellax(selector)
	}catch(err){
		console.warn('Parallax Fail',err);
	}
}