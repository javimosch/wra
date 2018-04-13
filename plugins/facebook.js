function log(){
	if(process.env.NODE_ENV === 'production') return;
	console.log.apply(this,arguments);
}
let integrated = false;
export function integrateFacebook() {
	if (integrated) {
		return false;
	}
	var div;
	if (!document.querySelector('.fb-customerchat')) {
		div = document.createElement('div');
		div.setAttribute('attribution', 'setup_tool');
		div.setAttribute('page_id', '172735413543583');
		div.setAttribute('theme_color', '#fa3c4c');
		let div = document.createElement('div');
	}
	if (!document.querySelector('#fb-root')) {
		div = document.createElement('div');
		div.id = 'fb-root';
		document.body.appendChild(div);
	}

	log('Initializiing facebook');
	
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s);
		js.id = id;
		js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	integrated = true;
	return true;
}