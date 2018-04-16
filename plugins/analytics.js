import Vue from 'vue';
import mixpanelMixins from '@/plugins/analytics-mixpanel';
export default async function({
	app,
	route
}, inject) {
	integrateKeen((client) => {
		integrateAnalyticsProvider({
			mixpanel:mixpanelMixins(),
			keen: {
				trackView: (url, route) => {
					client.recordEvent('track_view', {
						url: url
					});
				},
				trackEvent: (name,params) => {
					client.recordEvent(name, params);
				}
			}
		},{

		});
	})
}

function integrateAnalyticsProvider(mixins, methods = {}) {
	Vue.prototype.$ma = Object.assign(Vue.prototype.$ma || {}, {
		mixins: mixins
	}, methods);
}

function integrateKeen(next) {
	let scope = {};
	! function(name, path, ctx) {
		var latest, prev = name !== 'Keen' && window.Keen ? window.Keen : false;
		ctx[name] = ctx[name] || {
			ready: function(fn) {
				var h = document.getElementsByTagName('head')[0],
					s = document.createElement('script'),
					w = window,
					loaded;
				s.onload = s.onerror = s.onreadystatechange = function() {
					if ((s.readyState && !(/^c|loade/.test(s.readyState))) || loaded) {
						return
					}
					s.onload = s.onreadystatechange = null;
					loaded = 1;
					latest = w.Keen;
					if (prev) {
						w.Keen = prev
					} else {
						try {
							delete w.Keen
						} catch (e) {
							w.Keen = void 0
						}
					}
					ctx[name] = latest;
					ctx[name].ready(fn)
				};
				s.async = 1;
				s.src = path;
				h.parentNode.insertBefore(s, h)
			}
		}
	}('KeenAsync', 'https://d26b395fwzu5fz.cloudfront.net/keen-tracking-1.1.3.min.js', scope);

	scope.KeenAsync.ready(function() {
		// Configure a client instance
		var client = new scope.KeenAsync({
			projectId: '5acfb0cfc9e77c0001a033c8',
			writeKey: '4867B74602ACC0560E8CA812456EB1EB57955CFBE41751DA58C3135152249BE21E4714F522048B3ED1153DE5063CB51B1410357E4433C02A6B78EEDCE5731034D838DB5EDADF05CF7CA51E4832720355219006AA86AB00BEA818F1392B273791'
		});
		next(client);
	});
}