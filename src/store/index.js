/* This file should be included in Vimeography 2 core */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {
	gallery,
	player,
	videos
} from './modules';

const store = new Vuex.Store({
	modules: {
		gallery,
		player,
		videos,
	},
	// state: {},
	// getters: {},
	// mutations: {},
	// actions: {}
});

export default store;
