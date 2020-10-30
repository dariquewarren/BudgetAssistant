import React from "react";
import "./App.css";
import AppRouter from './routers/appRouter'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react"

function App(){
  
  return (
    <Auth0Provider
    domain="dev-sg8fbv3t.us.auth0.com"
    clientId="dDBCDAphCkb9dA1g9sP4JhTib0ZditlI"
    redirectUri={window.location.origin}
    useRefreshTokens = {true}
    cacheLocation="localstorage"
  >
     <AppRouter   />
     </Auth0Provider>
   )

}

export default App;
