//view层：视图展示
import React from 'react'
class Demo extends React.Component{
	constructor(props){
		super(props)
	}
	
	tap(){
		this.props.name(this.refs.ipt.value)
		this.refs.ipt.value = ""
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
							<div key={i}>
								{item}
							</div>
						)
					})
				}
			</div>
		)
	}
}

export default Demo;
