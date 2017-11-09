const getVideoId = (state, getters) => (video) => {
  return video.uri.replace(/\D/g,'')
}

const getVideosByTag = (state, getters) => (tag) => {
  return state.items.find(video => video.tags === tag)
}

const getVideoIndex = (state, getters) => (id) => {
  const order = getters.videoOrder;
  return order.indexOf(id);
}

const getAdjacentVideoId = (state, getters) => (id) => {
  const order = getters.videoOrder;
  const index = order.indexOf(id) + 1;
  const adjacentVideoId = order[index];
  return state.items[adjacentVideoId].id;
}

const videos = (state, getters) => {
  const order = state.filter.length > 0 ? state.filter : state.order;
  return order.map( id => state.items[id] )
}

const videoOrder = (state, getters) => {
  return state.filter.length > 0 ? state.filter : state.order;
}

export default {
  getVideoId,
  getVideosByTag,
  getVideoIndex,
  getAdjacentVideoId,
  videos,
  videoOrder
};
