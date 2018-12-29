//顶层容器----唯一能够获取store数据，调用setState的地方


import React from 'react';

import Demo from './Demo';

import Action from './Action';

import Dispatch from './Dispatch';

import Store from './Store';

class TodoController extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list:Store.getAll()
		}
		this.todoschange=this.todoschange.bind(this)
	}
	
	tap(text){
		Dispatch.dispatch(Action.addItem(text))
//		返回的是===={actionType,text}
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
				<h1>hello flux</h1>
				<Demo name={this.tap} tit={this.state.list}/>
			</div>
		)
	}
}

export default TodoController;