import React from 'react';
import $ from 'jquery';

class List extends React.Component{
	constructor(props){
		super(props)
		this.state={
			detail:''
		}
	}
	
	render(){
		return(
			<div>
				<h1>List</h1>
				<h3>{this.state.detail}</h3>
			</div>
		)
	}
	
	componentWillMount(){
		console.log(this.props.params.id)
		var _this=this;
		$.ajax({
			type:"get",
			url:"https://search.video.iqiyi.com/m?cb=cb_75jzz7&if=hotQuery&p=global",
			success:function(data){
				let str = data.split('=')
				let obj = JSON.parse(str[1])
				console.log(obj)
				let arr = obj.data
				for(let i in arr){
					if(_this.props.params.count == arr[i].click_count){
						console.log(arr[i])
						_this.setState({detail:arr[i].query})
					}
				}
			}
		});
		
	}
	
	componentWillReceiveProps(a){
		console.log(a.params.id)
		
		var _this=this;
		$.ajax({
			type:"get",
			url:"https://search.video.iqiyi.com/m?cb=cb_75jzz7&if=hotQuery&p=global",
			success:function(data){
				console.log(data)
				let str = data.split('=')
				let obj = JSON.parse(str[1])
				console.log(obj)
				let arr = obj.data
				for(let i in arr){
					if(a.params.count == arr[i].click_count){
						console.log(arr[i])
						_this.setState({detail:arr[i].query})
					}
				}
			}
		});
		
	}
	
	
}

export default List;