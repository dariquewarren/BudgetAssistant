import React, {useState, useEffect} from 'react';
import '../App.css';
import { useAuth0 } from "@auth0/auth0-react";
import firebase from '../firebase'
import { TextField} from '@material-ui/core'
import {Button,Badge, Card, Form, Col, Row, ListGroup} from "react-bootstrap";
import moment from 'moment'
import { FaGlasses, FaMinusCircle, FaPlayCircle, FaTimesCircle,
  FaCalendarAlt, FaCalendarMinus,
   FaCalendarPlus, FaSort,
    FaSortAmountUp, FaSortAmountDown, FaSortAlphaDownAlt, FaSortAlphaUpAlt, FaShareSquare} from 'react-icons/fa'


class EditExpense extends React.Component{
// set props {isauthenticated, email }

  constructor(props) {
    super(props);
    this.state = {
      
      expense: '',
      amount: '',
      notes: '',
      date: moment().format('YYYYMMDD'),
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

  let realId = this.props.props.props.match.params.id
  let realEmail = this.props.props.props.match.params.email.match(regex).join('')
  let expenseEmail = this.props.email.match(regex).join('')
  
console.log('expenseEmail',expenseEmail)
console.log('isAuthounticated',this.props.auth)
console.log('id parameter', realId)
console.log('email parameter', realEmail)

const params = window.location.search

console.log('window check',params)
console.log('props list', this.props)

    const itemsRef = firebase.database().ref('expenses/' + realEmail)
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
  console.log('items', items)
     
  for (let item in items) {
        newState.push({
          id: item,
          expense: items[item].expense,
          notes: items[item].notes,
          date: items[item].date,
          amount: items[item].amount,
        });
      }
  console.log('new state', newState)
    let realItem =  newState.filter((f)=>{
        return f.id === realId
      })
     
  console.log('filter experiment', realItem[0])
      
       this.setState({ 
         items: realItem[0],
        amount: realItem[0].amount,
        date: realItem[0].date,
        expense: realItem[0].expense,
        notes: realItem[0].notes
        
        });
      
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
    
    let regex = /[a-z]/gmi


    let realId = this.props.props.props.match.params.id
    let realEmail = this.props.props.props.match.params.email.match(regex).join('')    

    const itemsRef = firebase.database().ref('expenses/' + realEmail + '/' + realId)
    
    const item = {
      expense: this.state.expense,
      notes: this.state.notes,
      date: this.state.date,
      amount: this.state.amount,
    }
    itemsRef.update(item).then(()=>{
      alert('success')
        window.location.assign('/')
    }).catch((e)=>{
        console.log(e)
    })

    
  }
  
removeItem =()=>{
  let regex = /[a-z]/gmi


  let realId = this.props.props.props.match.params.id
  let realEmail = this.props.props.props.match.params.email.match(regex).join('')    

  const itemsRef = firebase.database().ref('expenses/' + realEmail + '/' + realId)
  
  itemsRef.remove().then(()=>{
    alert('success')
    window.location.assign('/')
  }).catch((e)=>{
    console.log(`not deleted:`, e)
  })
}

  render()
 { return (
    <div style={{backgroundColor: '#8fbfe0ff'}} className='text-primary'>
    <header className='text-center' style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}} >
    
    
<Card 
style={{backgroundColor: '#1d8a99ff', color: '#fdecd8ff', width: '250px'}}   
className=' text-wrap text-center my-2' 
onDoubleClick={(e)=>{
e.preventDefault()
    }}
>


<Card.Body>
<Card.Title>
<h5 className='text-uppercase text-bold'>{this.state.items.expense}</h5>
<Badge pill style={{backgroundColor: '#000000', color:' #15b344'}}>${this.state.amount}</Badge>

</Card.Title>

<div> {this.state.notes} 
</div>

</Card.Body>

<p>        {moment(this.state.date).format('MMMM Do, YYYY')}  
</p>
<div>


</div>
</Card>
    
</header>
    <section style={{width: '95vw'}} className='mt-2' >
    <div className='text-center mx-4' style={{backgroundColor: '#8fbfe0ff'}} >    

    <Form style={{backgroundColor: '757575', width: '100%'}} className='text-center' onSubmit={this.handleSubmit}>
    <div className='text-center' 
    style=
    {{
      width:'100%',
    display: 'flex', flexDirection: 'row', 
    flexWrap: 'wrap',
    alignItems: 'center', 
    justifyContent: 'center'
   }} > 
    <Col className='m-2  text-center' style={{width: '25%'}}>
    <Form.Label style={{color: '#22194dff', fontSize: 'large'}}>Expense</Form.Label>
    <Form.Control type='text' placeholder="Expense Name" className='bg-light text-center '  
    name='expense' maxLength='20'
    style={{width: '100%'}}
    value={this.state.expense} onChange={this.handleChange}  />
  </Col>
  <Col Col className='m-2 text-center' style={{width: '25%', fontStyle: 'bold', fontSize: '1.2rem'}}>
  <Form.Label style={{color: '#22194dff', fontSize: 'large'}}>Amount</Form.Label>
  <Form.Control placeholder="Amount" className='bg-light text-center' 
   name='amount' 
   style={{width: '100%'}}
   type='number' step='.01' min='.01' value={this.state.amount}
   onChange={this.handleChange}
   /> 
</Col>


<Col className='m-2 text-center' style={{width: '25%'}}>
<Form.Label style={{color: '#22194dff', fontSize: 'large'}}>Notes</Form.Label>
<Form.Control 
className='bg-light text-center' 
style={{width: '100%'}} 
name='notes'  type='text' placeholder="Extra Notes"
onChange={this.handleChange}
value={this.state.notes}
maxLength='50'
 />
</Col>
<Col className='m-2 text-center' style={{width: '25%'}}>
<Form.Label style={{color: '#22194dff', fontSize: 'large'}}>Date </Form.Label>
<Form.Control 
style={{width: '100%'}}
id="date"
className='bg-light text-center'
name='date'
type="date" 

onChange={this.handleChange}
/>
</Col>
</div>


</Form>
<Button onClick={this.handleSubmit} className='m-1'  style={{backgroundColor: '#283c63',color: '#fbe8d3'}} >Update Expense</Button>
<Button onClick={this.removeItem} className='m-1'  style={{backgroundColor: 'rgb(148, 0, 15)',color: '#fbe8d3'}}>
Delete Expense
</Button> 
</div>


    </section>
   
    </div>
    
  )}

}

const EditExpenseWrapper = (props)=>{

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
    
       console.log(props.id)
    getUserMetadata();
  }, [user]);
  //set props for children (isauthenticated, useremail). 
  // useremail value is conditioned on authentication.
    // email value = user.email or testtestcom

  return (
    <div>
    {
      user ? 
      <div>     
      <EditExpense props={props} auth={isAuthenticated} email={user.email}/>
      </div> : 
      <div>     
      
      <EditExpense props={props}  auth={isAuthenticated} email={'testtestcom'}/>
      </div>
      
      }

    </div>

      
    
  );

}


export default EditExpenseWrapper