import React from "react";
import "./App.css";
import AppRouter from './routers/appRouter'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react"

function App(){
  
  return (
    
     <AppRouter   />
     
   )

}

export default App;
