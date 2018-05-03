import {
	count as getUsersCount
} from '@/plugins/user';

export const state = () => ({
	selected: {
		_id: ''
	}
});

export const getters = {
  brandLogo (state, items) {
  	let logo = state.selected.images && state.selected.images.brand_logo ;
  	let basePath = logo && logo.url.substring(0,logo.url.indexOf('/upload/')+8)
    return logo && basePath + `v${logo.version.toString()}/${logo.public_id}`
  },
};

export const mutations = {
	setSelected(state, item) {
		state.selected = item;
	}
};

export const actions = {
	async setSelectedFromLocalStorage(store) {
		try {
			let str = window.localStorage.getItem('project.selected')
			var item = JSON.parse(str)
			store.commit('setSelected', item)
			return item._id;
		} catch (err) {
			return '';
		}

	}
};