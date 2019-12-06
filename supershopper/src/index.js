import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from './contexts/auth0-context';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Auth0Provider>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
