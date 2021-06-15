import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './custom-antd.css';



ReactDOM.render(<Router />, document.getElementById('root'));

serviceWorker.unregister();
