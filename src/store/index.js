import Vue from 'vue'
import Vuex from 'vuex'

import {firstStore} from './store'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        firstStore
    }
})