export function startParallax(selector){
	if(process.server)return;
	if(window.innerWidth<992) return;
	new Rellax(selector)
}