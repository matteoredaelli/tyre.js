import React from 'react';
import ReactDOM from 'react-dom';
//mport './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Form />, document.getElementById('root'));

registerServiceWorker();
