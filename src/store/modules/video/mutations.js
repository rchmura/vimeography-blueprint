import Vue from 'vue';

import * as types from './types';
import * as galleryTypes from '../gallery/types';

const mutations = {
  [galleryTypes.LOAD_GALLERY] (state, payload) {
      state.items = payload.video_set;
      state.active = parseInt(payload.activeVideoId);

      state.pages = {
        default: { ...payload.pages.default },
        filter: { ...payload.pages.filter }
      }

      state.loaded = true;
  },
  [types.LOAD_VIDEO] (state, payload) {
    state.active = parseInt(payload.id);
  },
  [galleryTypes.FETCH_PAGE] (state, payload) {
    state.loading = true;
  },
  [galleryTypes.FETCH_PAGE_SUCCESS] (state, payload) {

    let nextVideos = {};
    let nextVideoIds = [];

    payload.data.video_set.map(video => {
      nextVideos[video.id] = video;
      nextVideoIds.push(video.id);
    })

    state.items = {
      ...state.items,
      ...nextVideos
    };

    if ( payload.data.query ) {

      if ( state.pages.filter[payload.data.page] ) {

        state.pages.filter[payload.data.page] = [
          ...state.pages.filter[payload.data.page],
          ...nextVideoIds
        ]

      } else {
        Vue.set( state.pages.filter, payload.data.page, [ ...nextVideoIds ] )
      }

    } else {

      if ( state.pages.default[payload.data.page] ) {

        state.pages.default[payload.data.page] = [
          ...state.pages.default[payload.data.page],
          ...nextVideoIds
        ]

      } else {
        Vue.set( state.pages.default, payload.data.page, [ ...nextVideoIds ] )
      }

    }

    state.loading = false;
  },

  [galleryTypes.FETCH_PAGE_FAILURE] (state, payload) {
    state.loading = false;
  },

  [galleryTypes.CLEAR_SEARCH] (state, payload) {
    state.pages.filter = {};
  },

  [galleryTypes.PERFORM_SEARCH] (state, payload) {
    state.loading = true;
  },

  [galleryTypes.PERFORM_SEARCH_SUCCESS] (state, payload) {

    let nextVideos = {};
    let filteredVideoIds = [];

    payload.data.video_set.map(video => {
      nextVideos[video.id] = video;
      filteredVideoIds.push(video.id);
    })

    state.items = {
      ...state.items,
      ...nextVideos
    };

    Vue.set( state.pages.filter, payload.data.page, [ ...filteredVideoIds ] )

    state.loading = false;

  }
}

export default mutations;
