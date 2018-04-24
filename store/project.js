import {count as getUsersCount} from '@/plugins/user';

export const state = () => ({
  selected: {
  	_id:''
  }
});

export const mutations = {
  setSelected (state, item) {
    state.selected = item;
  }
};

export const actions = {
  
};



