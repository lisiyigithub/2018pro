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
								<div><Link to={{pathname:'/list',query:{id:item.goodsID}}}>{item.goodsName}</Link></div>
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
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			async:true,
			dataType:'jsonp',
			success:function(data){
				console.log(data)
				_this.setState({arr:data})
			}
		});
		
		
	}
	
}

export default Home;