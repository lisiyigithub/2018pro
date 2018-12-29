import React from 'react'
import '../css/sty.css'
import img from '../img/home2.jpg'

class App extends React.Component{
	constructor(props){
		super(props)
	}
	
	tap(){
		console.log('sss')
	}
	
	render(){
		return(
			<div>
				<h1 className="tit">hello</h1>
				<p>你好!webpack-dev-server</p>
				<button onClick={this.tap}>事件</button>
				<br/>
				<img src={require('../img/home2.jpg')}/>
				<img src={img}/>
				<div className="img"></div>
				<hr/>
			</div>
		)
	}
}

export default App;
