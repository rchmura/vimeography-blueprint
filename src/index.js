import Player from './components/Player.vue'

export default {
  install (Vue, params = {}) {
    Vue.component('Player', Player)
  }
}
