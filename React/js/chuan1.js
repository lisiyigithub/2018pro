class Demo extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			str:"",
			str1:""
		}
	}	
	
	tap(){
//		this.setState({str:e.target.value})
		//console.log(this.refs.ipt.value)//获取属性ref的值
		this.setState({str:this.refs.ipt.value})
	}
	
	fn(e){
//		console.log(e)
		this.setState({str1:e.target.value})
	}
	
	render(){
		return(
			<div>	
				<h1>父组件</h1>
				<input type="text" ref="ipt" onChange={this.tap.bind(this)}/>
				<p>接收子组件数据------{this.state.str1}</p>
				<hr/>
				<hr/>
				<Child name={this.state.str} handle={this.fn.bind(this)}/>
			</div>
		)
	}
}

class Child extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			str:""
		}
	}
	
	render(){
		return(
			<div>
				<h1>子组件</h1>
				<p>接收父组件数据-------{this.props.name}</p>
				<input type="text" ref="ipt1" onChange={this.props.handle}/>
			</div>
		)
	}
}

ReactDOM.render(<Demo/>,document.getElementById('app'))

//父组件--->子组件：父组件通过state设置要传递的数据，通过setState跟新传递数据，在子组件绑定自定义属性名，以key-value形式进行传值，子组件内部通过this.props进行接收
//子组件--->父组件：子组件通过绑定自定义属性，并通过事件接收自定义属性，父组件通过自定义函数中的参数e接收子组件传递的数据