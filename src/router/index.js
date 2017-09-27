import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// dynamic pages
// const View = () => import('../views/View.vue')

// static pages
const Home = () => import('@p/Home.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      // add router rules here
      { path: '/', name: 'PageHome', component: Home },
      //{ path: '*', redirect: '/' },
    ]
  })
}
