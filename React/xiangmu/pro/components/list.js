import React from 'react'
import $ from 'jquery'

class List extends React.Component{
	constructor(props){
		super(props)
		this.state={
			title:''
		}
	}
	render(){
		return(
			<div>
				<h1>详情列表</h1>
				<h3>{this.state.title}</h3>
			</div>
		)
	}
	componentWillMount(){
		console.log(this.props.params.count)
		let _this = this;
		$.ajax({
			url:'https://search.video.iqiyi.com/m?cb=cb_75jzz7&if=hotQuery&p=global',
			type:'get',
			success:function(data){
				let str = data.split('=')
				let obj = JSON.parse(str[1])
				console.log(obj)
				let arr = obj.data
				for(let i in arr){
					if(_this.props.params.count == arr[i].click_count){
						console.log(arr[i])
						_this.setState({title:arr[i].query})
					}
				}
			}
		})
	}
	
	componentWillReceiveProps(a){//监听a的传参，根据传参，给list页面传递数据
		console.log(a.params.count)
		let _this = this;
		$.ajax({
			type:'get',
			url:'https://search.video.iqiyi.com/m?cb=cb_75jzz7&if=hotQuery&p=global',
			success:function(data){
				console.log(data)
				let str = data.split('=')
				let obj = JSON.parse(str[1])
				console.log(obj)
				let arr = obj.data
				for(let i in arr){
					if(a.params.count == arr[i].click_count){
						console.log(arr[i])
						_this.setState({title:arr[i].query})
					}
				}
			}
		})
	}
}
export default List;
