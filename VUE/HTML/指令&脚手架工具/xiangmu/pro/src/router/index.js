import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Register from '@/view/register'
import Login from '@/view/login'
import Main from '@/view/main/main'
import Home from '@/view/main/home'
import About from '@/view/main/about'
import Other from '@/view/main/other'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/register',
    },
    {
    	path:'/register',
    	component:Register
    },
    {
    	path:'/login',
    	component:Login
    },
    {
    	path:'/main',
    	redirect:'/home',
    	component:Main,
    	children:[
    		{
    			path:'/home',
    			component:Home
    		},
    		{
    			path:'/about',
    			component:About
    		},
    		{
    			path:'/other',
    			component:Other
    		}
    	]
    }
  ]
})
