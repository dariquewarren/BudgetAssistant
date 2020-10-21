import React from "react";
import "./App.css";
import AppRouter from './routers/appRouter'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react"


class App extends React.Component {
 render(){
   return (
    <Auth0Provider
    domain="dev-sg8fbv3t.us.auth0.com"
    clientId="dDBCDAphCkb9dA1g9sP4JhTib0ZditlI"
    redirectUri={window.location.origin}
  >
     <AppRouter   />

     </Auth0Provider>
   )
 }

}


export default App;
