import {
	count as getUsersCount
} from '@/plugins/user';

export const state = () => ({
	selected: {
		_id: ''
	}
});

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