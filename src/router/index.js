import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',            
            name: 'People',
            alias: '/pessoas',
            component: () => import('../views/People')
        },
        {
            path: '/pedidos',
            name: 'Orders',
            component: () => import('../views/Orders')
        }
    ]
})

