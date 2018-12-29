import React,{Component} from 'react'

class View extends Component{
	constructor(props){
		super(props)
	}
	
	tap(){
		this.props.name(this.refs.ipt.value)
		this.refs.ipt.value=""
	}
	
	render(){
		return(
			<div>
				<input type="text" ref="ipt"/>
				<button onClick={this.tap.bind(this)}>添加</button>
				<hr/>
				{
					this.props.tit.map(function(item,i){
						return(
							<div key={i} onClick={console.log('sss')}>
								{i}----------{item}----------<button>删除</button>
							</div>
						)
					})
					
				}
			</div>
		)
	}
}
export default View;
