/* global document */

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

require('../css/style.less')

sync(store, router)

const app = new Vue({
    router,
    store,
    ...App
})

app.$mount('#App')