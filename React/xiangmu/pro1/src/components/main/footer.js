import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import '../../css/router.css'

class Footer extends Component{
	/*constructor(props){
		super(props)
	}*/
	render(){
		return(
			<div className="footer">
				<Link to="/home" activeclassname="active">首页</Link>
				<Link to="/about">关于</Link>
				<Link to="/other">其它</Link>
			</div>
		)
	}
}
export default Footer;
