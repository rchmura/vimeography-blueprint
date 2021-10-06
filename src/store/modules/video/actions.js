const axios = require("axios").default;

import * as types from "./types";

export const loadVideo = (store, id) => {
  store.commit({
    type: types.LOAD_VIDEO,
    id,
  });
};

export default {
  loadVideo,
};
