class Demo extends React.Component{
	constructor(props){
		super(props)
		this.props.str1 = "hellow"//此时声明的属性只能单个的声明
	}
	
	/*getDefaultProps(){//高版不生效
		return{
			str:'hello'
		}
	}*/
	
	render(){
		console.log(this.props)
		return(
			<div>
				<h1>高版本</h1>
				<p>{this.props.str}</p>
				<p>{this.props.arr[1]}</p>
				<p>{this.props.obj.name}</p>
				<p>{this.props.str1}</p>				
			</div>
		)
	}
}

Demo.defaultProps={
	str:'hello',
	arr:[1,2,3,4],
	obj:{
		name:"小明",
		age:24
	}
}

ReactDOM.render(<Demo/>,document.getElementById('app'))