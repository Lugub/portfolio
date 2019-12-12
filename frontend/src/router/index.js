import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../components/pages/MainPage'
import PortfolioPage from '../components/pages/PortfolioPage'
import IntroPage from '../components/pages/IntroPage'

//Time
import AnimationTime from '../components/items/AnimationTime'
import ProjectTime from '../components/items/ProjectTime'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: MainPage, name: 'main' },
    { path: '/portfolio', component: PortfolioPage, name: 'portfolio' },
    { path: '/intro', component: IntroPage, name: 'intro' },
    { path: '/animation', component: AnimationTime, name: 'animation'},

  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
