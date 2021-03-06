import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react"


ReactDOM.render(
  <React.StrictMode>
  <Auth0Provider
  domain="dev-sg8fbv3t.us.auth0.com"
  clientId="dDBCDAphCkb9dA1g9sP4JhTib0ZditlI"
  redirectUri={window.location.origin}
  audience="https://dev-sg8fbv3t.us.auth0.com/api/v2/"
  scope="read:current_user update:current_user_metadata"
  cacheLocation= "localstorage"
    useRefreshTokens = {true}
>


    <App />

    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
