import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const gallery = {
  state: {
    loading: false,
    id: '',
    theme: '',
    templates: {},
    version: '',
    settings: {},
    tags: {},
    source: '',
    limit: 0,
    paging: {
      default: {
        direction: 'desc',
        page: 1,
        highRange: 1,
        lowRange: 1,
        perPage: 100,
        sort: 'default',
        total: 0
      },
      filter: {
        direction: 'desc',
        page: 1,
        highRange: 1,
        lowRange: 1,
        perPage: 100,
        sort: 'default',
        total: 0,
        query: ''
      }
    },
  },
  mutations,
  actions,
  getters
}

export default gallery;
