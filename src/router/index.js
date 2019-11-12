import Vue from 'vue'
import Router from 'vue-router'
import commRoute from './commrouter';  
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
     redirect: '/main'
    },
    ...commRoute
  ]
})
