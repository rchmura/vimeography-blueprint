// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

import {
	gallery,
	player,
	videos
} from './modules';

// const store = new Vuex.Store({
// 	modules: {
// 		gallery,
// 		player,
// 		videos,
// 	},
// 	// state: {},
// 	// getters: {},
// 	// mutations: {},
// 	// actions: {}
// });

const storeModules = {
	gallery,
	player,
	videos,
};

export default storeModules;

// export default store;
