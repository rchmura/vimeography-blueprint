/* This file should be included in Vimeography 2 core */
import * as types from './types'

const playerReady = (store, player) => {
  store.commit({
    type: types.PLAYER_READY,
    player
  })
}

const playerPlay = (store, data) => {
  store.commit({
    type: types.PLAYER_PLAY,
    data
  })
}

const playerPause = (store, data) => {
  store.commit({
    type: types.PLAYER_PAUSE,
    data
  })
}

const playerEnded = (store, id) => {
  store.commit({
    type: types.PLAYER_ENDED,
    id
  });
}

const playerTimeUpdate = (store, data) => {
  store.commit({
    type: types.PLAYER_TIME_UPDATE,
    data
  })
}

const playerProgress = (store, data) => {
  store.commit({
    type: types.PLAYER_PROGRESS,
    data
  })
}

const playerSeeked = (store, data) => {
  store.commit({
    type: types.PLAYER_SEEKED,
    data
  })
}

const playerVolumeChange = (store, data) => {
  store.commit({
    type: types.PLAYER_VOLUME_CHANGE,
    data
  })
}

const playerLoaded = (store, data) => {
  store.commit({
    type: types.PLAYER_LOADED,
    data
  })
}

export default {
  playerReady,
  playerPlay,
  playerPause,
  playerEnded,
  playerTimeUpdate,
  playerProgress,
  playerSeeked,
  playerVolumeChange,
  playerLoaded
};
