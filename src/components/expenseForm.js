import React, {Component, useState, useEffect, useRef} from 'react';
import '../App.css';
import firebase from '../firebase'
import {TextField} from '@material-ui/core'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import { useAuth0} from "@auth0/auth0-react";





// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}






const FormProper = ()=>{

const [expense, setExpense] = useState(0)
const [amount, setAmount] = useState(0)
const [notes, setNotes] = useState(0)
const [date, setDate] = useState(0)
const [email, setEmail] = useState('ddw')
      const prevEmail = usePrevious(email);
  

const [userMetadata, setUserMetadata] = useState(null);
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

      setUserMetadata(user_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };
  
     
  getUserMetadata();
}, [prevEmail]);


const handleSubmit = (e)=>{
   e.preventDefault()
 setEmail(user.email)


   const itemsref = firebase.database().ref('expenses')
   
   
let expenses = {
  expense,
  amount,
  notes,
  date,
  email
}
  //  itemsref.push(expenses)
 // window.location.assign('/')

console.log(expenses)


}



  return (
    <div className='app ' style={{backgroundColor: '#393e46'}}>
    
    <header>
    <div className='wrapper text-center'>
    <h3 style={{color: '#fbe8d3'}}>Add Expense for 
    <h1>Now: {email}, before: {prevEmail}</h1>  </h3>
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