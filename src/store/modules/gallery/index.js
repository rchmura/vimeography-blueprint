import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const gallery = {
  state: {
    loading: false,
    id: '',
    theme: '',
    version: '',
    settings: {},
    tags: {},
    source: '',
    limit: 0,
    pro: false,
    paging: {
      default: {
        direction: 'desc',
        page: 1,
        current: 1,
        highRange: 1,
        lowRange: 1,
        perPage: 100,
        sort: 'default',
        total: 0,
        first: 1,
        next: null,
        previous: null,
        last: null
      },
      filter: {
        direction: 'desc',
        page: 1,
        highRange: 1,
        lowRange: 1,
        perPage: 100,
        sort: 'default',
        total: 0,
        current: null,
        first: 1,
        next: null,
        previous: null,
        last: null,
        query: ''
      }
    },
  },
  mutations,
  actions,
  getters
}

export default gallery;
