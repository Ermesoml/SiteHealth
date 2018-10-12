import Vue from 'vue'
import Router from 'vue-router'
import Sites from '@/components/Sites'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sites',
      component: Sites
    }
  ]
})
