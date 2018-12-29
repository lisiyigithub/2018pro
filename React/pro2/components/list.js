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
		console.log(this.props.location.query.id)
		var _this=this;
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			data:{goodsID:_this.props.location.query.id},
			async:true,
			dataType:'jsonp',
			success:function(data){
				_this.setState({detail:data[0].detail})
			}
		});
		
	}
	
	componentWillReceiveProps(a){
		console.log(a)
		
		var _this=this;
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			data:{goodsID:a.location.query.id},
			async:true,
			dataType:'jsonp',
			success:function(data){
				_this.setState({detail:data[0].detail})
			}
		});
		
	}
	
	
}

export default List;