import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,IndexRoute,IndexRedirect} from 'react-router'
import App from './components/app'
import Home from './components/home'
import About from './components/about'
import Other from './components/other'
import List from './components/list'

ReactDOM.render(<Router history={hashHistory}>
	<Route path="/" component={App}>
		<IndexRoute component={Home}/>
		<IndexRedirect to="/home"/>
		<Route path="/home" component={Home}>	
			<Route path='/list/:count' component={List}></Route>
		</Route>
		<Route path="/about" component={About}></Route>
		<Route path="/other" component={Other}>
			<IndexRedirect to="/home"/>
		</Route>		
	</Route>
</Router>,document.getElementById('app'))
