import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '../components/main'
import Home from '../components/home'
import About from '../components/about'
import Other from '../components/other'
import Mine from '../components/mine'
import Detail from '../components/detail'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect:'/home',
			component: Main,
			children:[
				{
					path:'/home',
					component:Home
				},
				{
					path:"/about",
					component:About
				},
				{
					path:'/other',
					component:Other
				},
				{
					path:'/mine',
					component:Mine
				}
			]
		},
		{
			path:'/detail',
			component:Detail
		}
	]
})
