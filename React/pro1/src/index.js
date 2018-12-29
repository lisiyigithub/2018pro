import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

import TodoController from './component/TodoController';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TodoController />, document.getElementById('root'));
registerServiceWorker();
