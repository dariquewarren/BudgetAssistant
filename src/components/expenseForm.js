import React, {Component, useState, useEffect, useRef} from 'react';
import '../App.css';
import firebase from '../firebase'
import {TextField} from '@material-ui/core'
import {Button, Form, Col, Row} from 'react-bootstrap'
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
  
    
  
     itemsref.push(expenses).then(()=>{
      window.location.assign('/')

     })
     
  



   }
  



}



  return (
    <div className='app ' style={{backgroundColor: '#8fbfe0ff'}}>
    
    <header>
    <br></br>
    <div className='wrapper text-center'>
    <h3 style={{color: '#22194dff'}}>Add Expense 
     </h3>
    </div>
    </header>
    
    

     <section style={{width: '100vw'}} >
     <div className='text-center ' 
     style=
     {{
       backgroundColor: '#8fbfe0ff'
  
    }} >
     
        
        
 
     <Form  style={{backgroundColor: '757575', width: '100%'}} className='text-center'
      onSubmit={handleSubmit} >
     
      <div className='text-center' 
      style=
      {{
        width:'100%',
      display: 'flex', flexDirection: 'row', 
      flexWrap: 'wrap',
      alignItems: 'center', 
      justifyContent: 'center'
     }} >  
  
     <Col   className=' text-center' style={{width: '50%'}} >
     <h5 style={{color: '#22194dff'}} >Expense</h5>
     <Form.Control type='text' placeholder="Expense Name" style={{width: '100%'}}
      className='bg-light text-center  '  
     name='expense' maxLength='20'  onChange={ (e)=>{
      setExpense(e.target.value)
    }} />
   </Col>
   <Col  className=' text-center' style={{width: '50%'}}>
   <h5 style={{color: '#22194dff'}}>Amount</h5>
   <Form.Control placeholder="Amount" style={{width: '100%'}} className='bg-light text-center ' 
    name='amount' type='number' step='.01' min='.01'  onChange={ (e)=>{
      setAmount(e.target.value)
    }}
    /> 
 </Col>
 
 <Col   className='text-center' style={{width: '50%'}}>
 <h5 style={{color: '#22194dff'}}>Notes</h5>
 <Form.Control className='bg-light text-center' 
 style={{width: '100%'}}
  name='notes'  type='text' placeholder="Extra Notes"
 onChange={ (e)=>{
  setNotes(e.target.value)
}}
 maxLength='50'
  />
 </Col>
 <Col  className=' text-center' style={{width: '50%'}}>
 <h5 style={{color: '#22194dff'}}>Date </h5>
 <Form.Control 
 id="date"
 style={{width: '100%'}}
  className='bg-light text-center'
 name='date'
 type="date" 
 onChange={ (e)=>{
  setDate(e.target.value)
}}

 />
 </Col>

 </div>

 </Form>
 <Button onClick={handleSubmit} className='m-2'  style={{backgroundColor: ' #283c63',color: '#fbe8d3'}}>Add Expense</Button>

 </div>
 </section>
    

    </div>
  )


}


export default FormProper