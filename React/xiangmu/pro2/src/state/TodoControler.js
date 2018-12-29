//顶层容器：唯一能够获取store的数据，调用setState的地方
import React,{Component} from 'react'
import Demo from './View'
import Action from './Action'
import Dispatch from './Dispatch'
import Store from './Store'

class TodoControler extends Component{
	constructor(props){
		super(props)
		this.state={
			list:Store.getAll()
		}
		this.todoschange = this.todoschange.bind(this)
	}
	
	tap(text){
//		Action(text)
		//通过dispatch提供的dispatch方法，接收action数据
		Dispatch.dispatch(Action.addItem(text))
		//==={actiontype,text}
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
				<Demo name={this.tap} tit={this.state.list}/>
			</div>
		)
	}
}
export default TodoControler;
