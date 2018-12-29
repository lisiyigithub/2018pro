var arr = [1,2,3,4]
var obj = {
	name:"小明",
	age:24
}
var Demo = React.createClass({
	render(){
		
		console.log(this.props)
		
		return(
			<div>
				<h2>hello</h2>
				<h1>{this.props.name}</h1>
				<p>{this.props.a}</p>
				<div>数组-----{this.props.b[2]}</div>
				<div>对象-----{this.props.c.name}</div>
			</div>
		)
	}
})
ReactDOM.render(<Demo name="hi" a="love" b={arr} c={obj}/>,document.getElementById('app'))