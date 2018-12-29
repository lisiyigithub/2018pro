import React from 'react';
import {Link} from 'react-router'


const Active={color:'red'}

class App extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return(
			<div>
				<h1>路由</h1>
				
				<Link to="/home" activeStyle={Active}>首页</Link>
				<Link to="/about" activeStyle={Active}>关于</Link>
				<Link to="/other" activeStyle={Active}>其他</Link>
				
				
				<div>
					{this.props.children}
				</div>
				
			</div>
		)
	}
}

export default App;