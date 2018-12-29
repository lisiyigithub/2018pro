//顶层容器
import React from 'react'
import View from './View'
import Action from './Action'
import Dispatch from './Dispatch'
import Store from './Store'

class Controler extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			list:Store.getAll()
		}
		this.todoschange = this.todoschange.bind(this)
	}
	
	tap(text){
		Dispatch.dispatch(Action.addItem(text))
	}
	
	todoschange(){
		var data = Store.getAll()
		this.setState({list:data})
	}
	
	componentDidMount(){
		Store.changelistener(this.todoschange)
	}
	
	render(){
		return(
			<div>
				<h1>Flux状态管理器</h1>
				<View name={this.tap} tit={this.state.list}/>
			</div>
		)
	}
}
export default Controler;
