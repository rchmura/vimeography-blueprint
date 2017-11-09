/* This file should be included in Vimeography 2 core */
import axios from 'axios';

import * as types from './types'

export const loadVideo = (store, id) => {
  store.commit({
    type: types.LOAD_VIDEO,
    id
  })
}

export default {
  loadVideo,
};
