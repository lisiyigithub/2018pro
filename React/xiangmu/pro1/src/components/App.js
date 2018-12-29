import React, { Component } from 'react';
import '../css/App.css';
import SetRouter from '../router/index.js'

class App extends Component {
  render() {
    return (
      <div className="App">       
				<SetRouter/>
      </div>
    );
  }
}

export default App;
