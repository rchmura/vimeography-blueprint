import * as types from './types';

const mutations = {
  [types.LOAD_GALLERY] (state, payload) {

    state.id = payload.id;
    state.theme = payload.theme;
    state.version = payload.version;
    state.source = payload.source;
    state.limit = payload.limit;

    state.pro = payload.pro || false;
    state.settings = payload.settings || {};
    state.tags = payload.tags || {};

    if (payload.paging) {

      state.paging.default = {
        sort: payload.paging.sort,
        direction: payload.paging.direction,
        total: payload.paging.total,
        page: payload.paging.page,
        perPage: payload.paging.per_page,
        lowRange: payload.paging.page,
        highRange: payload.paging.page,
        current: payload.paging.page,
        first: 1,
        next: payload.paging.page + 1 <= ( Math.ceil( payload.paging.total / payload.paging.per_page ) ) ? payload.paging.page + 1 : null,
        previous: payload.paging.page - 1 > 0 ? payload.paging.page - 1 : null,
        last: Math.ceil( payload.paging.total / payload.paging.per_page )
      };

    }
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
      current: payload.data.page,
      first: 1,

      next: payload.data.page + 1 <= ( Math.ceil( payload.data.total / payload.data.per_page ) ) ? payload.data.page + 1 : null,
      previous: payload.data.page - 1 > 0 ? payload.data.page - 1 : null,
      last: Math.ceil( payload.data.total / payload.data.per_page ),

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
      current: 1,
      first: 1,
      previous: null,
      next: null,
      last: null,
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

    paging.page = payload.data.page;
    paging.current = payload.data.page;
    paging.next = payload.data.page + 1 <= ( Math.ceil( paging.total / paging.perPage ) ) ? payload.data.page + 1 : null
    paging.previous = payload.data.page - 1 > 0 ? payload.data.page - 1 : null

    if ( payload.data.page > paging.highRange ) {
      paging.highRange = payload.data.page;
    }

    if ( payload.data.page < paging.lowRange ) {
      paging.lowRange = payload.data.page;
    }

    state.loading = false;
  },
  [types.FETCH_PAGE_FAILURE] (state, payload) {
    state.loading = false;
    state.error = 'errrrr!';
  }
}

export default mutations;
