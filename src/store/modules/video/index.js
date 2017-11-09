/* This file should be included in Vimeography 2 core */

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const videos = {
  state: {
    items: {},
    filter: [],
    order: [],
    loaded: false,
    loading: false,
    active: null,
    error: null
  },
  mutations,
  actions,
  getters
}

export default videos;
