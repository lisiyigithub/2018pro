import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Pagination } from 'antd';

class App extends Component {
	
	state = {
    current:1,
  }

  onChange = (page,pageSize) => {
    console.log(page);
    this.setState({
      current: page,
    });
    
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        	<ul>
        		<li>1</li>
        		<li>2</li>
        		<li>3</li>
        		<li>4</li>
        		<li>5</li>
        		<li>6</li>
        		<li>7</li>
        	</ul>     	
        </header>
        <Pagination current={this.state.current} onChange={this.onChange} total={10} pageSize={3} hideOnSinglePage={true}/>
      </div>
    );
  }
}

export default App;
