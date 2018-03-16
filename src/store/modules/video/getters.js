import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';

const getVideoId = (state, getters) => (video) => {
  return video.uri.replace(/\D/g,'')
}

const getVideosByTag = (state, getters) => (tag) => {
  return state.items.find(video => video.tags === tag)
}

const getVideoIndex = (state, getters) => (id) => {
  const order = getters.getVideoOrder;
  return order.indexOf(id);
}

const getAdjacentVideoId = (state, getters) => (id) => {
  const order = getters.getVideoOrder;
  const index = order.indexOf(id) + 1;
  const adjacentVideoId = order[index];
  return get(state.items[adjacentVideoId], 'id');
}

const getVideos = (state, getters) => {
  const order = getters.getVideoOrder
  return order.map( id => state.items[id] )
}

// Note: can't do this because it is possible to load page 2 before loading page 1,
// resulting in an attempt to slice index 21-40 even though it does not exist.
//
// We need to instead just return the object loaded in pages.
// const getVideosOnCurrentPage = (state, getters) => {
//   const paging = getters.paging;
//   const order = getters.getVideoOrder

//   const startIndex = ( paging.page * paging.perPage ) - paging.perPage;
//   const endIndex = (paging.page * paging.perPage);

//   return order.map( id => state.items[id] ).slice(startIndex, endIndex)
// }

const getVideosOnCurrentPage = (state, getters) => {
  const paging = getters.paging;

  return Object.keys(state.pages.filter).length > 0 ?
    state.pages.filter[paging.current].map( id => state.items[id] ) :
    state.pages.default[paging.current].map( id => state.items[id] );
}

const getVideoOrder = (state, getters) => {
  const filterPageNumbers = Object.keys(state.pages.filter)
  const defaultPageNumbers = Object.keys(state.pages.default)

  return filterPageNumbers.length > 0 ? flattenDeep( filterPageNumbers.map( page => state.pages.filter[page] ) ) : flattenDeep( defaultPageNumbers.map( page => state.pages.default[page] ) )
}

const getLoadedPageNumbers = (state, getters) => {
  const filterPageNumbers = Object.keys(state.pages.filter)
  const defaultPageNumbers = Object.keys(state.pages.default)

  return filterPageNumbers.length > 0 ? filterPageNumbers.map( page => parseInt(page) ) : defaultPageNumbers.map( page => parseInt(page) )
}

export default {
  getVideoId,
  getVideosByTag,
  getVideoIndex,
  getAdjacentVideoId,
  getVideos,
  getVideoOrder,
  getVideosOnCurrentPage,
  getLoadedPageNumbers
};
