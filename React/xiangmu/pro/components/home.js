import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router'

var Active = {
	color:'red'
}

class Home extends React.Component{
	constructor(props){
		super(props),
		this.state={
			arr:[]
		}
	}
	
	tap(){
		/*console.log('sss')
		var _this = this;
		$.ajax({
			type:'get',
			url:'https://search.video.iqiyi.com/m?cb=cb_75jzz7&if=hotQuery&p=global',
			success:function(data){
				console.log(data)
			}
		})*/
	}
	
	render(){
		return(
			<div>
				<h1>Home</h1>
				<button onClick={this.tap.bind(this)}>请求数据</button>
				<ul>
					{
						this.state.arr.map(function(item,i){
							return(
								<div><Link to={`/list/${item.click_count}`}>{item.query}</Link></div>
							)
						})
					}
				</ul>
				<div>
					<Link to="/home" activeStyle={Active}>首页</Link>
				<Link to="/about" activeStyle={Active}>关于</Link>
				<Link to="/other" activeStyle={Active}>其它</Link>
				</div>
				<hr/>
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
	
	componentWillMount(){
		var _this = this;
		$.ajax({
			type:'get',
			url:'https://search.video.iqiyi.com/m?cb=cb_75jzz7&if=hotQuery&p=global',
			success:function(data){
				console.log(data)
				let str = data.split("=")
				console.log(str)
				let obj = JSON.parse(str[1])
				_this.setState({arr:obj.data})
			}
		})
	}
}
export default Home;


