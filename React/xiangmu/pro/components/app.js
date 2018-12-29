import React from 'react'
import {Link} from 'react-router'

var Active = {
	color:'red'
}

class App extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
				<h1>路由</h1>
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}
export default App;


