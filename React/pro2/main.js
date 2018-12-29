import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,IndexRedirect,Redirect} from 'react-router';
import App from './components/app'
import Home from './components/home'
import About from './components/about'
import Other from './components/other'
import List from './components/list'


ReactDOM.render(<Router history={hashHistory}>
	<Route path="/" component={App}>	
		<Route path="/home" component={Home}>
			<Route path='/list' component={List}></Route>
		</Route>
		
		<Redirect from="/other"  to="/about" />
		<Route path="/other" component={Other}></Route>
		<Route path="/about" component={About}></Route>
		
		
	</Route>
</Router>,document.getElementById('out'))
