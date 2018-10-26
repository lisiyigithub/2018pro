import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '../components/main'
import Home from '../components/home'
import About from '../components/about'
import Other from '../components/other'
import Mine from '../components/mine'
import Detail from '../components/detail'
import Detail2 from '../components/detail2'
import Demo from '../components/demo'
import Phone from '../components/phone'
import Tan from '../page/tankuang'
import Map from '../page/map'

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
		},
		{
			path:'/detail2',
			component:Detail2
		},
		{
			path:'/demo',
			component:Demo
		},
		{
			path:'/tankuang',
			component:Tan
		},
		{
			path:'/map',
			component:Map
		},
		{
			path:'/phone',
			component:Phone
		}
	]
})
