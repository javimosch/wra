import Vue from 'vue';

/* MOVE TO MODULE */
import facebook from '@/plugins/analytics.fb'
import google from '@/plugins/analytics.ga'


var state = {
	userId: '',options:{}
}

function log(){
	if(!state.options.debug)return;
	var args = Array.prototype.slice.call(arguments);
	args.unshift('Analytics:');
	console.log.apply(this,args);
}

var AnalyticsPlugin = {}
AnalyticsPlugin.install = function(Vue, options = {}) {
	state.options = options;
	if (options.fb !== false) {
		log('initializing fb')
		facebook()
	} else {
		if (process.env.ANALYTICS_APP_VERSION) {
			FB.AppEvents.setAppVersion(process.env.ANALYTICS_APP_VERSION);
		}

	}
	log('ga options',!!options.ga && options.ga.debug === true);
	if (options.ga !== false) {
		google(!!options.ga && options.ga.debug === true)
	} else {
		if (options.ga && options.ga.disableLocalhost && location.hostname == 'localhost') {
			log('ga disable sendHit')
			ga('set', 'sendHitTask', null);
		}
	}

	Vue.prototype.$analytics = {
		trackEvent: (params,a,l,v) => {
			if(!params){
				throw new Error('trackEvent: string of object required')
			}
			if (typeof params === 'string') {
				let action = typeof a=='string'?a:params;
				let label = typeof l=='string'?l:'';
				let value = typeof v=='number'?v:0;
				let category = (action&&label)?params:'default' 
				params = {
					category: category,
					action: action,
					label: label,
					value: value
				};
			}

			log('trackEvent',params)

			if (options.ga !== false) {
				let payload = {
					hitType: 'event',
					eventCategory: params.category,
					eventAction: params.action||'',
					eventLabel: params.label||'',
					eventValue: params.value||0,
					fieldsObject: params.fieldsObject||{}
				};
				log('trackEvent goggle ',payload);
				ga('send', payload);
			}
			if (options.fa !== false) {
				var fbParams = {};
				let paramsAsString = params.category + (params.action ? '_'+params.action  : '') + (params.label ? '_'+params.label : '');
				fbParams[FB.AppEvents.ParameterNames.LEVEL] = paramsAsString;
				if (params.description) {
					fbParams[FB.AppEvents.ParameterNames.DESCRIPTION] = params.description;
				}
				log('trackEvent facebook ACHIEVED_LEVEL LEVEL',paramsAsString);
				FB.AppEvents.logEvent(
					FB.AppEvents.EventNames.ACHIEVED_LEVEL,
					null, // numeric value for this event - in this case, none
					fbParams
				);
			}

		},
		setUserId: (id) => {
			if (id) {
				if (options.ga !== false) {
					ga('set', 'userId', USER_ID);
				}
				if (options.fb !== false) {
					state.userId(id);
					FB.AppEvents.setUserID(state.userId);
				}
			} else {
				if (options.fb !== false) {
					FB.AppEvents.clearUserID()
				}
			}
		},
		setUserProps: (props) => {
			if (options.fb !== false) {
				FB.AppEvents.updateUserProperties(normalizeFacebookUserProperties(props), (err) => {
					console.log('Analytics: Facebook set user props ', res);
				});
			}
		}
	};
}

Vue.use(AnalyticsPlugin,{
	debug: process.env.NODE_ENV!=='production'
})

export default ({
	app,
	route
}, inject) => {
	app.router.afterEach((to, from) => {
		if (state.options.ga !== false && window.ga) {
			ga('set', 'page', to.fullPath)
			ga('send', 'pageview')
		}
		if (state.fb !== false && window.FB) {
			FB.AppEvents.setUserID(state.userId);
			FB.AppEvents.logPageView();
		}
	});
}


function normalizeFacebookUserProperties(props) {
	let res = Object.assign({}, props);
	for (var key in res) {
		if (['city', 'country', 'zipCode', 'user_type'].includes(key)) {
			delete res[key];
			res['$' + key] = props[key];
		}
	}
	if (props.role) {
		props.$user_type = props.role;
		delete props.role;
	}
	return res;
}