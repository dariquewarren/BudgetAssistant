import React, {Component, useState, useEffect} from 'react';
import '../App.css';
import firebase from '../firebase'
import {TextField} from '@material-ui/core'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import { useAuth0} from "@auth0/auth0-react";



const FormProper = ()=>{

const [expense, setExpense] = useState(0)
const [amount, setAmount] = useState(0)
const [notes, setNotes] = useState(0)
const [date, setDate] = useState(0)

const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    


useEffect(() => {
  const getUserMetadata = async () => {
    const domain = "dev-sg8fbv3t.us.auth0.com";
    let myToken
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      });

      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user_metadata } = await metadataResponse.json();
console.log(accessToken)
myToken = accessToken
      setUserMetadata(user_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };
  
     
  getUserMetadata();
}, []);


let expenses = {
  expense,
  amount,
  notes,
  date
}
const handleSubmit = (e)=>{
   e.preventDefault()
   const itemsref = firebase.database().ref('expenses')
   
   
   itemsref.push(expenses)

   

    window.location.assign('/')
 }



  return (
    <div className='app ' style={{backgroundColor: '#393e46'}}>
    
    <header>
    <div className='wrapper text-center'>
    <h3 style={{color: '#fbe8d3'}}>Add Expense for {user.email} </h3>
    </div>
    </header>
    <div className='container'> 
    <section className='add-item'>

    <div className='text-center' style={{backgroundColor: '#393e46'}} >
    
    <form style={{backgroundColor: '757575'}} className='text-center' onSubmit={handleSubmit}>
    <div className='text-center' style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}} >
    <h5 style={{color: '#fbe8d3'}} className='m-2'>
    Expense <br></br>
    <TextField className='bg-light text-center '   name='expense'  onChange={ setExpense} />

    </h5>
    <h5 style={{color: '#fbe8d3'}} className='m-2'>
    Amount <br></br>
    <TextField className='bg-light text-center'  name='amount' type='number' step='.01' min='.01'  onChange={ setAmount}  />

    </h5>
    
    <h5 style={{color: '#fbe8d3'}} className='m-2'>
    Notes <br></br>
    <TextField
   className='bg-light text-center'  
   name='notes' placeholder='extra notes' onChange={ setNotes}  
  
  />
  
    </h5>
    

    <h5  style={{color: '#fbe8d3'}} className='m-2'>
    Date <br></br> 
    <TextField 

    id="date"
    className='bg-light text-center'
    name='date'
    
    type="date"  
    onChange={ setDate}
    InputLabelProps={{
      shrink: true,
    }}
  />
    </h5>
    
    
    </div>
    <Button onClick={handleSubmit}  style={{backgroundColor: '#753775', color: '#fbe8d3'}}>Add Expense</Button>


    </form>
    </div>
     </section>
    
    </div>
    </div>
  )


}


export default FormProper