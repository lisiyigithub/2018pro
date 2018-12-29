import React from 'react'
import Footer from '../main/footer.js'
import '../../css/router.css'
import { Carousel } from 'antd';
import pic from '../../assets/logo.svg'
import pic2 from '../../assets/@2xzhifu_icon_chenggong.png'
class About extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			pic1:pic
		}
	}
	
	tap(){
		this.setState({pic1:pic2})
		
	}
	
	render(){
		return(
			<div>
				<h1>About</h1>
			    <Carousel autoplay>
				    <div><h3>1</h3></div>
				    <div><h3>2</h3></div>
				    <div><h3>3</h3></div>
				    <div><h3>4</h3></div>
				  </Carousel>
				  <img alt="" src={this.state.pic1} onClick={this.tap.bind(this)}/>
				<Footer/>
			</div>
		)
	}
}

export default About;
