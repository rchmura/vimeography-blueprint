import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const videos = {
  state: {
    items: {},
    pages: {
      default: {},
      filter: {}
    },
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
