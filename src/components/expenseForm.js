import React from 'react';
import '../App.css';
import firebase from '../firebase'
import {TextField} from '@material-ui/core'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import { useAuth0 } from "@auth0/auth0-react";


class FormProper extends React.Component{
  constructor() {
    super();
    this.state = {
      expense: '',
      amount: '',
      notes: '',
      date: new moment().format('YYYYMMDD'),
      items: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

 
  handleChange = (e)=>{
   if(e.target.name !== 'date'){
this.setState({
      [e.target.name]: e.target.value
    })
   } else{
     this.setState({
       [e.target.name] : moment(e.target.value).format("YYYYMMDD")
     })
   }
   
   
    
  }
  handleSubmit = (e)=>{
    e.preventDefault()
    const itemsref = firebase.database().ref('expenses')
    
    const item = {
      expense: this.state.expense,
      notes: this.state.notes,
      date: this.state.date,
      amount: this.state.amount
    }
    itemsref.push(item)

    

     window.location.assign('/')
  }
  


  render()
 { return (
    <div className='app ' style={{backgroundColor: '#393e46'}}>
    
    <header>
    <div className='wrapper text-center'>
    <h3 style={{color: '#fbe8d3'}}>Add Expense </h3>
    {this.props.email}
    </div>
    </header>
    <div className='container'> 
    <section className='add-item'>

    <div className='text-center' style={{backgroundColor: '#393e46'}} >
    
    <form style={{backgroundColor: '757575'}} className='text-center' onSubmit={this.handleSubmit}>
    <div className='text-center' style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}} >
    <h5 style={{color: '#fbe8d3'}} className='m-2'>
    Expense <br></br>
    <TextField className='bg-light text-center '  label={this.state.expense} name='expense'  onChange={this.handleChange} />

    </h5>
    <h5 style={{color: '#fbe8d3'}} className='m-2'>
    Amount <br></br>
    <TextField className='bg-light text-center'  label={this.state.amount} name='amount' type='number' step='.01' min='.01'  onChange={this.handleChange}  />

    </h5>
    
    <h5 style={{color: '#fbe8d3'}} className='m-2'>
    Notes <br></br>
    <TextField
   className='bg-light text-center'  
   name='notes' placeholder='extra notes' onChange={this.handleChange}  
  
  />
  
    </h5>
    

    <h5  style={{color: '#fbe8d3'}} className='m-2'>
    Date <br></br> 
    <TextField 

    id="date"
    className='bg-light text-center'
    name='date'
    
    type="date"  
    onChange={this.handleChange}
    InputLabelProps={{
      shrink: true,
    }}
  />
    </h5>
    
    
    </div>
    <Button onClick={this.handleSubmit}  style={{backgroundColor: '#753775', color: '#fbe8d3'}}>Add Expense</Button>


    </form>
    </div>
     </section>
    
    </div>
    </div>
  )}

}

const ExpenseForm =()=>{

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
<div>
{
  isAuthenticated ?   <div>

  <h2>{user.name}</h2>
  <p>{user.email}</p>
  <FormProper email={user.email}/>
</div>: 
<p>Please Login</p>

}
</div>
    
    
  );

}


export default FormProper