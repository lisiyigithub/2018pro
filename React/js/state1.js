
var Demo = React.createClass({
	
	getInitialState(){
		return{
			str:"hi",
			arr:[1,2,4],
			obj:{
				name:"小明",
				age:24
			}
		}
	},
	
	tap(){		
		this.setState({str:"hello"})
	},
	
	render(){
		//setState不能在render中调用，否则会无限循环
		console.log(this.state)
		return(
			<div>
				<h2>state状态</h2>
				<p>{this.state.str}</p>
				<button onClick={this.tap}>改变状态</button>
			</div>
		)
	}
})
ReactDOM.render(<Demo/>,document.getElementById('app'))