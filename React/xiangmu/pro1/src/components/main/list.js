import React from 'react'
import {Link} from 'react-router-dom'
import '../../css/router.css'
class List extends React.Component{
	/*constructor(props){
		super(props)
	}*/
	render(){
		return(
			<div className="list" style={{marginTop:'50px'}}>
				<header>
					<Link style={{position:'absolute',left:'15px',fontSize:'24px',textDecoration:'none',color:'#fff'}} to="/home">&lt;</Link>
		        	<h2>List</h2>
		        </header>
				<h3>列表</h3>
			</div>
		)
	}
}
export default List;
