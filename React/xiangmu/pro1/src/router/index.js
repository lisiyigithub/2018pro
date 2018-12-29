import React,{Component} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from '../components/main/home.js'
import About from '../components/main/about.js'
import Other from '../components/main/other.js'
import List from '../components/main/list.js'

import '../css/router.css'

class SetRouter extends Component{
	render(){
		return(
			<div className="router">
				<Router>
					<div>
						<Route exact path="/" component={Home}/>
						<Route path="/home" component={Home}/>
						<Route path="/about" component={About}/>
						<Route path="/other" component={Other}/>
						<Route path="/list" component={List}/>						
					</div>						
				</Router>
			</div>
		)
	}
}

export default SetRouter;