import Vue from 'vue'
// cannot use code splitting here
// const Home = () => import('@p/Home.vue')
import Home from '@p/Home.vue'

describe('Home.vue', () => {
  it('home should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
