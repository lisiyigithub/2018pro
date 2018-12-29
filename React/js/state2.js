class Demo extends React.Component{
	constructor(props){
		super(props)
		this.props.str1 = "hellow"//此时声明的属性只能单个的声明
		this.state = {//高版写法
			str:"hello",
			arr:[1,2,4],
			obj:{name:"小明"}
		}
		this.tap = this.tap.bind(this)//绑定的第二种写法
	}
	
	/*getInitialState(){//高版抛弃了这个钩子函数
		return{
			str:"hello",
			arr:[1,2,4],
			obj:{name:"小明"}
		}
	}*/
	
	tap(){
		this.setState({str:"hi"})
	}
	
	render(){
		console.log(this.state)
		return(
			<div>
				<h1>高版本</h1>
				<p>{this.props.str1}</p>	
				<p>{this.state.str}</p>
				<button onClick={this.tap.bind(this)}>修改</button>
				<button onClick={this.tap}>修改</button>
			</div>
		)
	}
}

/*Demo.defaultProps={
	str:'hello',
	arr:[1,2,3,4],
	obj:{
		name:"小明",
		age:24
	}
}*/

ReactDOM.render(<Demo/>,document.getElementById('app'))