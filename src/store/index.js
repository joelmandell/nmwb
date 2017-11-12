import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/Login'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login
    },
    plugins: [createPersistedState()]}
)