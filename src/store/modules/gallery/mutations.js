import * as types from './types';

const mutations = {
  [types.LOAD_GALLERY] (state, payload) {

      state.id = payload.id;
      state.theme = payload.theme;
      state.version = payload.version;
      state.settings = payload.settings;
      state.tags = payload.tags;
      state.source = payload.source;
      state.limit = payload.limit;
      state.pro = payload.pro;

      state.paging.default = {
        sort: payload.paging.sort,
        direction: payload.paging.direction,
        total: payload.paging.total,
        page: payload.paging.page,
        perPage: payload.paging.per_page,
        lowRange: payload.paging.page,
        highRange: payload.paging.page,
      };

      state.paging.filter.perPage = payload.paging.per_page;

      // state.paging.filter = payload.filter;
  },

  [types.PERFORM_SEARCH] (state, payload) {
    state.loading = true;
    state.paging.filter.query = payload.query;
  },

  [types.PERFORM_SEARCH_SUCCESS] (state, payload) {
    // Set temporary search items in state.paging.filter
    state.loading = false;

    state.paging.filter = {
      ...state.paging.filter,
      page: payload.data.page,
      total: payload.data.total
    }

    if ( payload.data.page > state.paging.filter.highRange ) {
      state.paging.filter.highRange = payload.data.page;
    }

    if ( payload.data.page < state.paging.filter.lowRange ) {
      state.paging.filter.lowRange = payload.data.page;
    }
  },

  [types.PERFORM_SEARCH_FAILURE] (state, payload) {
    state.loading = false;
    state.error = 'errrrr!';
  },

  [types.CLEAR_SEARCH] (state, payload) {
    state.paging.filter = {
      ...state.paging.filter,
      page: 1,
      highRange: 1,
      lowRange: 1,
      total: 0,
      query: ''
    };
  },

  [types.FETCH_PAGE] (state, payload) {
    state.loading = true;
  },

  [types.FETCH_PAGE_SUCCESS] (state, payload) {
    const paging = this.getters.paging;

    paging.page = payload.page;

    if ( payload.page > paging.highRange ) {
      paging.highRange = payload.page;
    }

    if ( payload.page < paging.lowRange ) {
      paging.lowRange = payload.page;
    }

    state.loading = false;
  },
  [types.FETCH_PAGE_FAILURE] (state, payload) {
    state.loading = false;
    state.error = 'errrrr!';
  }
}

export default mutations;
