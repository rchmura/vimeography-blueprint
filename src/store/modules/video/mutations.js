import Vue from 'vue';

import * as types from './types';
import * as galleryTypes from '../gallery/types';

const mutations = {
  [galleryTypes.LOAD_GALLERY] (state, payload) {
      state.items = payload.video_set;
      state.active = parseInt(payload.activeVideoId);
      state.order = payload.order;
      state.filter = payload.filter;
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

      state.filter = [
        ...state.filter,
        ...nextVideoIds
      ];

    } else {

      state.order = [
        ...state.order,
        ...nextVideoIds
      ];

    }

    state.loading = false;
  },

  [galleryTypes.FETCH_PAGE_FAILURE] (state, payload) {
    state.loading = false;
  },

  [galleryTypes.CLEAR_SEARCH] (state, payload) {
    state.filter = [];
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

    state.filter = [
      ...filteredVideoIds
    ];

    state.loading = false;

  }
}

export default mutations;
