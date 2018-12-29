import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

//import TodoControler from './state/TodoControler.js'

import Controler from './component/controler'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Controler/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
