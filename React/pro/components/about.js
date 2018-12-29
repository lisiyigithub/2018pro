import React from 'react';

import {hashHistory} from 'react-router'

class About extends React.Component{
	constructor(props){
		super(props)
	}
	
	tap(){
		hashHistory.push('/other')
	}
	
	render(){
		return(
			<div>
				<h1>About</h1>
				<button onClick={this.tap.bind(this)}>跳转到other</button>
			</div>
		)
	}
}

export default About;