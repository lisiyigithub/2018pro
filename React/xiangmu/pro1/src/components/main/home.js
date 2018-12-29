import React from 'react'
import {Link} from 'react-router-dom'

import Footer from '../main/footer.js'

import '../../css/router.css'
class Home extends React.Component{
	/*constructor(props){
		super(props)
	}*/
	render(){
		return(
			<div>
				<header>
		        	Home
		        </header>
				<h1 style={{marginTop:'50px'}}>Home</h1>
				<Link to="/list">点击</Link>
				<Footer/>
			</div>
		)
	}
}

export default Home;
