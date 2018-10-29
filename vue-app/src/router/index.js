import Vue from 'vue'
import Router from 'vue-router'
const main = r => require.ensure([], () => r(require('../components/main')), 'main');
const shouye = r => require.ensure([], () => r(require('../page/main/shouye')), 'shouye');
const about = r => require.ensure([], () => r(require('../page/main/about')), 'about');
const other = r => require.ensure([], () => r(require('../page/main/other')), 'other');
const mine = r => require.ensure([], () => r(require('../page/main/mine')), 'mine');
const register = r => require.ensure([], () => r(require('../page/other/register')), 'register');
const login = r => require.ensure([], () => r(require('../page/other/login')), 'login');




Vue.use(Router)

export default new Router({
  mode:'history',
  base:"/app",
  routes: [
    {
      path:'/',
      name:'Main',
      component:main,
      children:[
        {
          path: '/shouye',
          name: 'Shouye',
          component: shouye,
          meta:"首页"
        },
        {
          path: '/about',
          name: 'About',
          component: about,
          meta:"关于"
        },
        {
          path: '/other',
          name: 'Other',
          component: other,
          meta:"其他"
        },
        {
          path: '/mine',
          name: 'Mine',
          component: mine,
          meta:"我的"
        }
      ]      
    },
    {
      path:"/register",
      component:register
    },
    {
      path:'/login',
      component:login
    }
  ]
})
