import React from "react";
import "./App.css";
import AppRouter from './routers/appRouter'
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component {
 render(){
   return (
     <AppRouter   />
   )
 }

}


export default App;
