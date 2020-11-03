import React, {useState, useEffect} from 'react';
import '../App.css';
import { useAuth0 } from "@auth0/auth0-react";
import firebase from '../firebase'
import { TextField} from '@material-ui/core'
import {Button} from 'react-bootstrap'
import moment from 'moment'



class EditExpense extends React.Component{
// set props {isauthenticated, email }

  constructor(props) {
    super(props);
    this.state = {
      
      expense: '',
      amount: '',
      notes: '',
      date: '',
      items: []
    }
    
    this.removeItem = this.removeItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
// mutate email to exclude non letters
// change items ref to select conditionally either expense/moddedEmail or expenses/testtestcom
let regex = /[a-z]/gmi
  let expenseEmail = this.props.email.match(regex).join('')
  let id = window.location.pathname.slice(6)
console.log('expenseEmail',expenseEmail)
console.log('email', this.props.email)
console.log('isAuthounticated',this.props.auth)
console.log('id number', id)

    const itemsRef = firebase.database().ref('expenses/' + expenseEmail)
  
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
  console.log('items', items)
      for (let item in items) {
        newState.push({
          id: item,
          expense: items[item].expense,
          notes: items[item].notes,
          date: moment(items[item].date).format("MMM Do"),
          amount: items[item].amount,
        });
      }
  console.log('new state', newState)
    let experiment =  newState.filter((f)=>{
        return f.id === id
      })
     
  console.log('filter experiment', experiment)
      
      this.setState({ items: newState});
      
    });


  }

  handleChange = (e)=>{
      e.preventDefault()

if(e.target.name === 'date'){
    this.setState({
        date: moment(e.target.value).format("YYYYMMDD")
    })
} else{
this.setState({
    [e.target.name]: e.target.value
})

}

 
    
    
  }
  handleSubmit = (e)=>{
    e.preventDefault()
    const id = window.location.pathname.slice(6)
    

    const itemsRef = firebase.database().ref('expenses/' + this.props.email + '/' + id)
    
    const item = {
      expense: this.state.expense,
      notes: this.state.notes,
      date: this.state.date,
      amount: this.state.amount
    }
    itemsRef.update(item).then(()=>{
        window.location.assign('/')
    }).catch((e)=>{
        console.log(e)
    })

    
  }
  
removeItem =()=>{
    const id = window.location.pathname.slice(6)

  const itemRef = firebase.database().ref('expenses/' + this.props.email + '/' + id)
  itemRef.remove().then(()=>{
    alert('success')
    window.location.assign('/')
  }).catch((e)=>{
    console.log(`not deleted:`, e)
  })
}

  render()
 { return (
    <div style={{backgroundColor: '#393e46'}} className='text-primary'>
    <header className='text-center' >
    <button

style={{backgroundColor: '#60316e', height: '15rem', width: '20rem'}}   
className=' text-wrap text-center m-2 p-1' 
onClick={(e)=>{
  e.preventDefault()
  console.log('test')


}}

>
<h4 style={{color: '#fbe8d3'}}>
{this.state.expense.toUpperCase()}
</h4>

<div  
style={{backgroundColor: '#60316e'}}
>
<h5 style={{color: '#078d1e'}}>${this.state.amount}</h5>
<div
style={{backgroundColor: '#60316e'}}
className="card ">

<div  className="card-body">      
      
        <div className="text-xs font-weight-bold text-warning text-uppercase ">
        <h6 style={{color: '#090030'}}>Notes</h6>
        <h5 style={{color:'#fbe8d3'}} className='text-center text-wrap'>{this.state.notes}</h5> 
        

    </div>
    
  </div>
  
</div>
<h6 style={{color: '#090030'}} className='text-center'>{moment(this.state.date).format('MMMM Do YYYY')}</h6>

</div>

<h5 style={{color: '#29a19c'}}>Click To Edit/Delete</h5>
      
</button>
    
</header>
    
    <section >
    <form style={{backgroundColor: '757575'}} className='text-center' onSubmit={this.handleSubmit}>
    <div className='text-center' style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}} >
    <h5 style={{color: 'white'}} >
    Expense <br></br>
    <TextField className='bg-light text-center' style={{width: '10rem', margin: '10px'}}  label={this.state.expense} name='expense'  onChange={this.handleChange} />

    </h5>
    <h5 style={{color: 'white'}}>
    Amount <br></br>
    <TextField className='bg-light text-center' style={{width: '10rem', margin: '10px'}}  label={this.state.amount} name='amount' type='number' step='.01' min='.01'  onChange={this.handleChange}  />

    </h5>
    
    <h5 style={{color: 'white'}}>
    Notes <br></br>
    <TextField
  style={{width: '10rem', margin: '10px'}} className='bg-light text-center'  label='EXTRA NOTES' name='notes' placeholder='extra notes' onChange={this.handleChange}  
  
  />
  
    </h5>
    

    <h5 style={{height: '5.5rem', width: '12rem', color: 'white'}} >
    Date <br></br> 
    <TextField 
    style={{width: '10rem'}}
    id="date"
    className='bg-light text-center m-3'
    name='date'
    
    type="date"  
    onChange={this.handleChange}
    InputLabelProps={{
      shrink: true,
    }}
  />
    </h5>
    
    
    </div>
    <Button onClick={this.handleSubmit}  style={{backgroundColor: '#753775'}}>Update Expense</Button>
    <Button onClick={this.removeItem} className='bg-danger'>
    Delete Expense
    </Button>

    </form>
    </section>
   
    </div>
    
  )}

}

const EditExpenseWrapper = ()=>{

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-sg8fbv3t.us.auth0.com";
      
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
       
  let myToken = await accessToken
  console.log(accessToken)
  
      } catch (e) {
        console.log(e.message);
      }
    };
    
       
    getUserMetadata();
  }, []);
  //set props for children (isauthenticated, useremail). 
  // useremail value is conditioned on authentication.
    // email value = user.email or testtestcom

  return (
    <div>
    {
      isAuthenticated === true ? 
      <div>     
      <EditExpense  auth={isAuthenticated} email={user.email}/>
      </div> : 
      <div>     
      <EditExpense  auth={isAuthenticated} email={'testtestcom'}/>
      </div>
      
      }

    </div>

      
    
  );

}


export default EditExpenseWrapper