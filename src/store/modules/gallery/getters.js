/* This file should be included in Vimeography 2 PRO core */

const paging = (state, getters) => {
  return state.paging.filter.total > 0 ? state.paging.filter : state.paging.default;
}

export default {
  paging
};
