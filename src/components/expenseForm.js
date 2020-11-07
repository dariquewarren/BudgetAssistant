import React, {Component, useState, useEffect, useRef} from 'react';
import '../App.css';
import firebase from '../firebase'
import {TextField} from '@material-ui/core'
import {Button, Form, Col} from 'react-bootstrap'
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

const [newExpense, setExpense] = useState(0)
const [newAmount, setAmount] = useState(0)
const [newNotes, setNotes] = useState(0)
const [newDate, setDate] = useState(false)
const [newEmail, setEmail] = useState('test@test.com')

const prevEmail = usePrevious(newEmail);
  

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

   const regex = /[a-z]/gmi

   let expenseEmail = (isAuthenticated) ? user.email.match(regex).join('') : newEmail.match(regex).join('')

   if(newAmount < .01){
return alert('Amount is required (min $0.01)')
   } else if (!newDate) {
return alert('Date is required')
   } else if (!newExpense.length){
    return alert('expense required')
   }else{

    let expenses =  {
      expense: newExpense,
      amount: newAmount,
      notes: newNotes,
      date:  moment(newDate).format('YYYYMMDD'),
      email: 'testtestcom'
    }
    console.log('expensesEmail', expenseEmail)
  
    const itemsref = firebase.database().ref('expenses/testtestcom')
  
    
  
     itemsref.push(expenses)
     alert('success')
    // window.location.assign('/')
  
    console.log(expenses)



   }
  



}



  return (
    <div className='app ' style={{backgroundColor: '#fdecd8ff'}}>
    
    <header>
    <br></br>
    <div className='wrapper text-center'>
    <h3 style={{color: '#22194dff'}}>Add Expense 
     </h3>
    </div>
    </header>
    <br></br>
    <br></br>
    <div className='container'> 
    <section className='add-item'>

    <div className='text-center' style={{backgroundColor: '#fdecd8ff'}} >
    
    
    <div className='text-center' style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}} >
    
    
   
    <Form style={{backgroundColor: '#fdecd8ff'}} className='text-center m-2' onSubmit={handleSubmit}> 
  <Form.Row>
    <Col  xs='auto'>
    <Form.Label style={{color: '#22194dff', fontSize: 'large'}}>Expense</Form.Label>
      <Form.Control className='bg-light text-center '   name='expense'  onChange={ (e)=>{
        setExpense(e.target.value)
      }}  type='text' placeholder="Expense Name" />
    </Col>
    <Col xs='auto'>
    <Form.Label style={{color: '#22194dff', fontSize: 'large'}}>Amount</Form.Label>
      <Form.Control className='bg-light text-center'  name='amount' type='number' step='.01' min='.01'  onChange={ (e)=>{
        setAmount(e.target.value)
      }}  placeholder="Amount" />
    </Col>
    <Col xs='auto'>
    <Form.Label style={{color: '#22194dff', fontSize: 'large'}}>Notes</Form.Label>
      <Form.Control className='bg-light text-center'  
      name='notes' placeholder='extra notes' onChange={(e)=>{
       setNotes(e.target.value)
      }}   type='text' placeholder="Extra Notes" />
    </Col>
    <Col xs='auto'>
    <Form.Label style={{color: '#22194dff', fontSize: 'large'}}>Date</Form.Label>
      <Form.Control id="date"
      className='bg-light text-center'
      name='date'
      placeholder="date"
      type="date"  
      onChange={ (e)=>{
        setDate(e.target.value)
      }}   />
    </Col>
  </Form.Row>
  <Button onClick={handleSubmit} className='m-2'  style={{backgroundColor: ' #283c63',color: '#fbe8d3'}}>Add Expense</Button>

</Form>
    
    
    </div>
   
    
   
    </div>
     </section>
    
    </div>
    </div>
  )


}


export default FormProper