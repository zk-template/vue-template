/*
 * @Description: 
 * @Author: wangfpp
 * @LastEditors: wangfpp
 * @Date: 2019-04-16 16:48:33
 * @LastEditTime: 2019-04-16 16:50:04
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {

    },
    plugins: [
        createPersistedState({})
    ]
});
