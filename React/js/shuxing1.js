var str = "hello world"
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
				<h2>展开式传值:不能传递字符串;只适合传递对象类型的数据</h2>
				<p>{this.props.name}</p>
			</div>
		)
	}
})
ReactDOM.render(<Demo {...obj}/>,document.getElementById('app'))