import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../pages/index.vue'
import head from '../components/head.vue'
import foot from '../components/foot.vue'

Vue.use(VueRouter)

const router = new VueRouter({
     mode: 'hash',
    base: __dirname,
    routes: [
        /*主路由，子路由*/
        {  path: '/', component: index ,
            children:[
                {  path: '/head', component: head },
                {  path: '/foot', component: foot },
            ]
        },
        {  path: '/index.html', component: index },
        /*分块加载*/
        {  path: '/list', component: resolve => require(['../pages/list'],resolve) },
    ]
})

export default router
