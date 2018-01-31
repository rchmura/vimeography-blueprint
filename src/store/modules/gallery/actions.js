/* This file should be included in Vimeography 2 PRO core */
import axios from 'axios';

import * as types from './types'

const loadGallery = (store, payload) => {
  store.commit({
    type: types.LOAD_GALLERY,
    payload
  })
}

const advanceGallery = (store, payload) => {
  store.commit({
    type: types.ADVANCE_GALLERY,
    payload
  })
}

const fetchPage = async (store, nextOrPrevious) => {

  const paging = store.getters.paging;

  const lowestPage = paging.lowRange;
  const highestPage = paging.highRange;
  const currentPage = paging.page;

  const firstPage = 1;
  const lastPage  = Math.ceil(paging.total / paging.perPage);

  let pageNumber;

  switch (nextOrPrevious) {
    case 'next':
      pageNumber = highestPage + 1
      break;
    case 'previous':
      pageNumber = lowestPage - 1
      break;
    default:
      return;
  };

  // const pageIsCached = lowestPage <= pageNumber && highestPage >= pageNumber;
  const pageExists = pageNumber > 0 && pageNumber <= lastPage;

  if ( ! pageExists ) {
    console.log(`Vimeography: requested page ${pageNumber} does not exist, no request was made.`);
    return;
  }

  // const pageExceedsLimit = paging.perPage * highestPage > store.state.limit;
  const pageExceedsLimit = store.getters.videoOrder.length >= store.state.limit;

  if ( pageExceedsLimit && store.state.limit !== 0 ) {
    console.log(`Vimeography: requested range exceeds gallery limit, no request was made.`);
    return;
  }

  if ( ! store.state.loading ) {

    const payload = {
      gallery_id: store.state.id,
      source: store.state.source,
      limit: store.state.limit,
      page: pageNumber,
      per_page: paging.perPage,
      direction: paging.direction,
      sort: paging.sort
    };

    if (paging.query) {
      delete payload.gallery_id;
      payload.query = paging.query;
    }

    store.commit({
      type: types.FETCH_PAGE,
      ...payload
    });

    try {
      const response = await axios.get(store.state.settings.xhr.ajax_url, {
        params: {
          action: 'vimeography_pro_request',
          nonce: store.state.settings.xhr.nonce,
          payload
        }
      })

      store.commit({
        type: types.FETCH_PAGE_SUCCESS,
        ...response,
        data: {
          ...payload,
          ...response.data,
        }
      })
    } catch (e) {
      store.commit({
        type: types.FETCH_PAGE_FAILURE,
        message: e.message,
        ...payload
      });
    }

  }
}

const performSearch = async (store, query) => {
  if ( query == "" ) {
    store.commit(types.CLEAR_SEARCH);
    return;
  }

  const paging = store.getters.paging;

  store.commit({
    type: types.PERFORM_SEARCH,
    query
  });

  const payload = {
    source: store.state.source,
    limit: store.state.limit,
    per_page: paging.perPage,
    sort: paging.sort,
    direction: paging.direction,
    query
  };

  try {
    const response = await axios.get(store.state.settings.xhr.ajax_url, {
      params: {
        action: 'vimeography_pro_request',
        nonce: store.state.settings.xhr.nonce,
        payload
      }
    })

    store.commit({
      type: types.PERFORM_SEARCH_SUCCESS,
      ...response,
      query
    })

  } catch (e) {
    store.commit({
      type: types.PERFORM_SEARCH_FAILURE,
      message: e.message,
      query
    });
  }
}

export default {
  loadGallery,
  fetchPage,
  advanceGallery,
  performSearch,
};
