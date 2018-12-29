class Demo extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			str:'文本',
			type:'text'
		}
	}
	
	tap(){		
		if(this.state.type == 'text'){
			this.setState({str:'密码',type:'password'})
		}else{
			this.setState({str:'文本',type:'text'})
		}
	}
	
	render(){
		console.log(this.state)
		return(
			<div>	
				<input type={this.state.type} placeholder={this.state.type}/>
				<button onClick={this.tap.bind(this)}>{this.state.str}</button>				
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