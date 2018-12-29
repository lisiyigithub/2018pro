import React from 'react';
import $ from 'jquery'
import {Link} from 'react-router'


class Home extends React.Component{
	constructor(props){
		super(props)
		this.state={
			arr:[]
		}
	}
	
	render(){
		return(
			<div>
				<h1>shouyes</h1>
				
				<div>
					{
						this.state.arr.map(function(item,i){
							return(
								<div><Link to={`/list/${item.click_count}`}>{item.query}</Link></div>
							)
						})
					}
				</div>
				
				<hr/>
				
				<div>{this.props.children}</div>
				
			</div>
		)
	}
	
	componentWillMount(){
		var _this=this;
		$.ajax({
			type:"get",
			url:"https://search.video.iqiyi.com/m?cb=cb_75jzz7&if=hotQuery&p=global",
			success:function(data){
				console.log(data)
				let str = data.split("=")
				console.log(str)
				let obj = JSON.parse(str[1])
				_this.setState({arr:obj.data})
			}
		});
		
		
	}
	
}

export default Home;