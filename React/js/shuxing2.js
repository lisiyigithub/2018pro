var Demo = React.createClass({
	
	getDefaultProps(){//这里的属性值是私有的
		return{
			str:"hello",
			arr:[1,2,3,4],
			obj:{
				name:"小明",
				age:24
			}
		}
	},
	
	render(){
		
		console.log(this.props)
		
		return(
			<div>
				<h2>hello</h2>
				<p>{this.props.str}</p>
				<p>{this.props.arr[0]}</p>
				<p>{this.props.obj.name}</p>
				
			</div>
		)
	}
})
ReactDOM.render(<Demo/>,document.getElementById('app'))