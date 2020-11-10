import React, {useState,useEffect} from "react";
import "../App.css";
import firebase from "../firebase";
import {Button,Badge, Card, Form, Col, Row, ListGroup} from "react-bootstrap";
import { TextField} from "@material-ui/core";
import moment from "moment";
import { FaGlasses, FaMinusCircle, FaPlayCircle, FaTimesCircle,
  FaCalendarAlt, FaCalendarMinus,
   FaCalendarPlus, FaSort,
    FaSortAmountUp, FaSortAmountDown, FaSortAlphaDownAlt, FaSortAlphaUpAlt, FaShareSquare} from 'react-icons/fa'
import {BsFillGearFill} from 'react-icons/bs'
import LoginButton from '../components/loginButton'
import UserContext from './userContext'
import { useAuth0 } from "@auth0/auth0-react";
import expensesData from '../tests/fixtures/expensesData'




class ExpenseDashboard extends React.Component {
 constructor(props){
    super(props);
    this.state = {
      myEmail: 'test@test.com',
      expensesTotal: 0,
      budget: 0,
      expense: "",
      notes: "",
      amount: "",
      date: new moment().format("YYYY MM Do"),
      searchTerm: "",
      showGeneralOptions: false,
      showSortOptions: false,
      showDateFilters: false,
      showSearchFilter: false,
      
      filterBy: "date",
      startDate: new moment().format("YYYY MM Do"),
      endDate: new moment().add(365, "days").format("YYYY MM Do"),
      items: [],
      list: [],
      email: this.props.email
    };
 
  
    this.setStartDateRange = this.setStartDateRange.bind(this);
    this.setEndDateRange = this.setEndDateRange.bind(this);
    this.handleBeginningDate = this.handleBeginningDate.bind(this);
    this.handleEndingDate = this.handleEndingDate.bind(this);

    this.showDateFilters = this.showDateFilters.bind(this);
    this.showSortOptions = this.showSortOptions.bind(this);
    this.showSearchFilter = this.showSearchFilter.bind(this);

    this.sortAmountLowHigh = this.sortAmountLowHigh.bind(this);
    this.sortDateLowHigh = this.sortDateLowHigh.bind(this);
    this.sortAmountHighLow = this.sortAmountHighLow.bind(this);
    this.sortDateHighLow = this.sortDateHighLow.bind(this);

    this.handleBudget = this.handleBudget.bind(this)
    this.setBudget = this.setBudget.bind(this)
 }

 componentDidMount() {
   console.log(expensesData)
// log is loading prop to console via conditional
console.log('see about delay when logging in. consider, isLoading prop') 
  console.log('state-email', this.props.auth)

  let regex = /[a-z]/gmi
   
  let expenseEmail = this.state.myEmail.match(regex).join('')
  let realLocation = `expenses/` + this.props.email
  let myExpensesRef =  firebase.database().ref('expenses').child(expenseEmail) 
  
  
  myExpensesRef.on("value", (snapshot) => {
    let items = snapshot.val();
console.log('expense email', expenseEmail)
console.log(this.props.email)
//  let testFilter = items.filter((f)=>{
//    return f.includes('testtestcom')
//  })
//  console.log(testFilter)
    let newState = [];

    for (let item in items) {
      newState.push({
        id: item,
        expense: items[item].expense,
        notes: items[item].notes,
        date: items[item].date,
        amount: items[item].amount,
        email: items[item].email,
      });
    }

    console.log(newState)

    let amountArray = [];
    newState.forEach((e)=>{
      return amountArray.push(Number(e.amount))
    })

    let ddw = amountArray.reduce((total, currentValue) => {
      return total + currentValue;
    });

    console.log(ddw);
    this.setState({ items: newState, expensesTotal: ddw });
    
  });

myExpensesRef.off('value', (snapshot) => {
  let items = snapshot.val();
console.log('expense email', expenseEmail)
console.log(this.props.email)
//  let testFilter = items.filter((f)=>{
//    return f.includes('testtestcom')
//  })
//  console.log(testFilter)
  let newState = [];

  for (let item in items) {
    newState.push({
      id: item,
      expense: items[item].expense,
      notes: items[item].notes,
      date: items[item].date,
      amount: items[item].amount,
      email: items[item].email,
    });
  }

  console.log(newState)

  let amountArray = [];
  newState.forEach((e)=>{
    return amountArray.push(Number(e.amount))
  })

  let ddw = amountArray.reduce((total, currentValue) => {
    return total + currentValue;
  });

  console.log(ddw);
  this.setState({ items: newState, expensesTotal: ddw });
  
})
  
  }
  
  handleBudget = (e)=>{
    e.preventDefault()
this.setState({
  budget: e.target.value
})

  }
setBudget = (e)=>{
    e.preventDefault()
    var budget = e.target.budgetAmount.value
    this.setState({
        budget
      })
console.log( e.target.budgetAmount.value)
  }


  showDateFilters = () => {
    let show = this.state.showDateFilters;
    this.setState({
      showDateFilters: !show,
      showSortOptions: false,

      showSearchFilter: false,
    });
  };
  showSearchFilter = () => {
    this.setState({
      showSearchFilter: !this.state.showSearchFilter,
      showSortOptions: false,
      showDateFilters: false,
    });
  };
  showSortOptions = () => {
    let show = this.state.showSortOptions;
    this.setState({
      showSortOptions: !show,
      showDateFilters: false,
      showSearchFilter: false,
    });
  };
  sortAmountLowHigh = () => {
    let real = this.state.items;
    let newItems = real.sort((a, b) => {
      return Number(a.amount)  - Number(b.amount);
    });
    this.setState({ items: newItems });
  };

  sortAmountHighLow = () => {
    let real = this.state.items;
    let newItems = real.sort((a, b) => {
      return Number(b.amount) - Number(a.amount) ;
    });
    this.setState({ items: newItems });
  };

  sortDateLowHigh = () => {
    let regex = /[a-z]/gmi
    let expenseEmail = this.state.myEmail.match(regex).join('')
    
    let myExpensesRef = firebase.database().ref("expenses/" + expenseEmail)
    
    
    
    myExpensesRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      for (let item in items) {
        newState.push({
          id: item,
          expense: items[item].expense,
          notes: items[item].notes,
          date: items[item].date,
          amount: items[item].amount,
        });
      }

      let newItems = newState.sort((a, b) => {
        return parseInt(a.date, 10) - parseInt(b.date, 10);
      });

      let realState = [];

      for (let item in newItems) {
        realState.push({
          id: item,
          expense: newItems[item].expense,
          notes: newItems[item].notes,
          date: moment(newItems[item].date).format("MMMM Do, YYYY"),
          amount: newItems[item].amount,
        });
      }

      console.log(realState);
      this.setState({ items: realState });
    });
  };

  sortDateHighLow = () => {
    let regex = /[a-z]/gmi
    let expenseEmail = this.state.myEmail.match(regex).join('')
    let myExpensesRef = firebase.database().ref("expenses/" + expenseEmail)
    
    myExpensesRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      for (let item in items) {
        newState.push({
          id: item,
          expense: items[item].expense,
          notes: items[item].notes,
          date: items[item].date,
          amount: items[item].amount,
        });
      }

      let newItems = newState.sort((a, b) => {
        return parseInt(b.date, 10) - parseInt(a.date, 10);
      });

      let realState = [];

      for (let item in newItems) {
        realState.push({
          id: item,
          expense: newItems[item].expense,
          notes: newItems[item].notes,
          date: moment(newItems[item].date).format("MMMM Do, YYYY"),
          amount: newItems[item].amount,
        });
      }

      console.log(realState);
      this.setState({ items: realState });
    });
  };

  changeSearchTerm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    let searchTerm = this.state.searchTerm;
    console.log("search term", searchTerm);
    let regex = /[a-z]/gmi
    let expenseEmail = this.state.myEmail.match(regex).join('')
    let myExpensesRef = firebase.database().ref("expenses/" + expenseEmail)
    

    myExpensesRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      for (let item in items) {
        newState.push({
          id: item,
          expense: items[item].expense,
          notes: items[item].notes,
          date: items[item].date,
          amount: items[item].amount,
        });
      }
      let filterState = [];

      newState.forEach((f) => {
        let regex = new RegExp(searchTerm.toUpperCase());
        if (regex.test(f.expense.toUpperCase()) || regex.test(f.notes.toUpperCase())  ) {
          filterState.push(f);
        }
      });
console.log('filter state', filterState)
      let expenseArray = [];

      filterState.forEach((e) => {
        expenseArray.push(parseInt(e.amount, 10));
      });

      let dummyArray = [];

      let expensesTotal =
        expenseArray.length === 0
          ? dummyArray
          : expenseArray.reduce((a, b) => {
              return a + b;
            });

      console.log("serch list", filterState);
      this.setState({
        searchTerm: "",
        items: filterState,
        showSearchFilter: !this.state.showSearchFilter,
        expensesTotal,
      });
    });
  };

  setStartDateRange = () => {
    let regex = /[a-z]/gmi
    let expenseEmail = this.state.myEmail.match(regex).join('')
    let myExpensesRef = firebase.database().ref("expenses/" + expenseEmail)
    

    this.setState({
        items: []
    })

    myExpensesRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      for (let item in items) {
        newState.push({
          id: item,
          expense: items[item].expense,
          notes: items[item].notes,
          date: items[item].date,
          amount: items[item].amount,
        });
      }

      
      let newArray = newState.filter((f) => {
        return (
          moment(f.date).format("X") > moment(this.state.startDate).subtract(1, 'day').format("X")
        );
      });

      console.log("Filtered Array", newArray);

      let expenseArray = [];

      newArray.forEach((e) => {
        expenseArray.push(parseInt(e.amount, 10));
      });

      let dummyArray = [];

      let expensesTotal =
        expenseArray.length === 0
          ? dummyArray
          : expenseArray.reduce((a, b) => {
              return a + b;
            });

      console.log("new array", newArray);
      this.setState({
        items: newArray,
        showDateFilters: !this.state.showDateFilters,
        expensesTotal,
      });
    });
  };

  setEndDateRange = () => {
    let regex = /[a-z]/gmi
    let expenseEmail = this.state.myEmail.match(regex).join('')
    let myExpensesRef = firebase.database().ref("expenses/" + expenseEmail)
    
    myExpensesRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      for (let item in items) {
        newState.push({
          id: item,
          expense: items[item].expense,
          notes: items[item].notes,
          date: items[item].date,
          amount: items[item].amount,
        });
      }

      console.log("new state", newState);
      let newArray = newState.filter((f) => {
        return(
          moment(f.date).format("X") <= moment(this.state.endDate).format("X")
        )
      });
      console.log("filtered array", newArray);
      let expenseArray = [];

      newArray.forEach((e) => {
        expenseArray.push(parseInt(e.amount, 10));
      });

      let finalArray = []
      newArray.forEach((e)=>{
          finalArray.push({
              id: e.id,
              expense: e.expense,
              amount: e.amount,
              notes: e.notes,
              date: moment(e.date).format('MMMM Do YYYY')


          })
      })
console.log('final array', finalArray)
      let dummyArray = [1,2,3];

      let expensesTotal =
        expenseArray.length === 0
          ? dummyArray
          : expenseArray.reduce((a, b) => {
              return a + b;
            });
      console.log("new array", newArray);
      this.setState({
        items: finalArray,
        showDateFilters: !this.state.showDateFilters,
        expensesTotal,
      });
    });
  };

  handleBeginningDate = (e) => {
    let value = e.target.value;

    console.log(value);
    this.setState({
      startDate: value,
    });
  };

  handleEndingDate = (e) => {
    let value = e.target.value;

    this.setState({
      endDate: value,
    });
  };
// use isLoading prop to conditionally render summary part. if not possible, just use the whole compeonent
    render(){
      
     return (
<div>
  
 
<div style={{backgroundColor: '#8fbfe0ff', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>


  <div style={{backgroundColor: '#fdecd8ff', color:'#3d1c3d'}} className="card  shadow text-center py-2 m-2">
  
 
 
  <p>
  {this.state.items.length === 1 ? 
    `${this.state.items.length} Expense`
    : 
    `${this.state.items.length} Expenses` }
    
    <br></br> 
     <Badge pill style={{backgroundColor: '#000000', color:'#15b344', fontSize:'medium'}}>
    ${this.state.expensesTotal}
    </Badge> 

      </p>  
 
      <div>
      
              
              <Badge pill className='text-right' style={{color: '#0f6e14', fontSize: 'medium'}} >
              Budget: ${this.state.budget}
              </Badge> 
{this.state.budget > this.state.expensesTotal ? 
  <div>
  <Badge pill className='text-right' style={{color: '#0f6e14', fontSize: 'medium'}} >
  Surplus: ${isNaN(parseInt(this.state.budget, 10).toFixed(2)) === false ? parseInt(this.state.budget, 10).toFixed(2) - parseInt(this.state.expensesTotal, 10).toFixed(2) : (0)  } 
  </Badge>
  </div>
  :
  <div>
  <Badge pill className='text-right' style={{color: 'rgb(182, 19, 13)', fontSize: 'medium'}} >
  Surplus: ${isNaN(parseInt(this.state.budget, 10).toFixed(2)) === false ? parseInt(this.state.budget, 10).toFixed(2) - parseInt(this.state.expensesTotal, 10).toFixed(2) : (0)  } 
  </Badge>
  </div>
}
<form  onSubmit={this.setBudget}>
<h6>Set Budget</h6>
<input style={{width: '25%'}} name='budgetAmount' type='number' value={this.state.budget} min='.01' step='.01' onChange={this.handleBudget} onClick={(e)=>{e.preventDefault(); e.target.value=''}} />    
<button style={{backgroundColor: ' #283c63',color: '#fbe8d3', width: '6rem',  width: '20%'}}>Go</button>
</form>
    
      </div>


    
      
        
          
<p className='text-right m-1'> 
<button
style={this.state.showGeneralOptions ? {height: '2rem', backgroundColor: '#ad0404e7'} : {height: '2rem', backgroundColor: '#078d1e'} }

className='rounded rounded-circle shadow'
onClick={(e)=>{
e.preventDefault()
this.setState({
  showGeneralOptions: !this.state.showGeneralOptions
})
}}> <BsFillGearFill />
 </button>
</p> 
    
      

   
  </div>



{this.state.showGeneralOptions ?
  
  <div  
  style={{backgroundColor: '#fbe8d3', width: '350px'}}
  >
  <div className="text-xs font-weight-bold text-center text-uppercase mb-1" style={{color: '#283c63'}}>
        Sort And Filter 
        </div>
  <div
  style={{backgroundColor: 'rgb(245, 222, 196)'}}
  className="card border-left-warning shadow h-100 py-2">
  
  <div  className="card-body" style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>         
      
          <button onClick={this.showSortOptions}
          style=
          {this.state.showSortOptions 
            ? 
            {backgroundColor: '#ad0404e7', color: 'white'}
             :
              {backgroundColor: '#283c63', color: 'white'}} 
        
          className="btn btn-icon-split m-1">
          
          <span className="text">
           {this.state.showSortOptions 
            ?(
          <FaMinusCircle/>  
            )
          :( <FaPlayCircle/>)

          } Sort 
          <FaSort  className='mx-2'/>
           </span>
        </button>


           <button onClick={this.showDateFilters}
           style=
           {this.state.showDateFilters 
             ? 
             {backgroundColor: '#ad0404e7', color: 'white'}
              :
               {backgroundColor: '#283c63', color: 'white'}} 
         
           className="btn btn-icon-split m-1">
           <span className="text"> 
           {this.state.showDateFilters 
            ?
              (<FaMinusCircle/>)
            :
            (<FaPlayCircle/>)
            } Filter 
            <FaCalendarAlt className='mx-2 '/>
            </span>
         </button>
  
            <button onClick={this.showSearchFilter}
            style=
            {this.state.showSearchFilter 
              ? 
              {backgroundColor: '#ad0404e7', color: 'white'}
               :
                {backgroundColor: '#283c63', color: 'white'}} 
          
            className="btn btn-icon-split m-1">
            
            <span className="text">  {this.state.showSearchFilter 
            ?
              (<FaMinusCircle/>)
            :
            (<FaPlayCircle/>)
            } Search
            <FaGlasses className='mx-2'/></span>
          </button>

       
  
         
       
      
    </div>
  </div>
  </div>
  

  : <p></p>}

</div>

<div style={{backgroundColor: '#8fbfe0ff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

{this.state.showSortOptions 
  ? <div style={{backgroundColor: '#8fbfe0ff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
  <h5> 
  <button 
  style={{backgroundColor: '#283c63',  color: '#078d1e'}}
  onClick={this.sortAmountLowHigh}>  $ <FaSortAmountUp/></button> 
  <button 
  style={{backgroundColor: '#283c63',  color: '#078d1e'}}
  onClick={this.sortAmountHighLow} >  $ <FaSortAmountDown/></button>
  
  <button 
  style={{backgroundColor: '#283c63', color: '#fbe8d3'}}
  onClick={this.sortDateLowHigh}><FaSortAlphaUpAlt/> Date</button>
  <button 
  style={{backgroundColor: '#283c63', color: '#fbe8d3'}}
  onClick={this.sortDateHighLow}><FaSortAlphaDownAlt/> Date</button> 
  </h5>
  </div>
  
  :  <p></p>
  }


{this.state.showDateFilters ? (
  <div className='text-center' 
  style={{backgroundColor: '#8fbfe0ff'}}>
  
<Form>
<Form.Row className='p-1'>
<Col xs={6} style={{backgroundColor: '#3f88c5ff'}} className='text-center'>
<Form.Label style={{color: '#fbe8d3', fontSize: 'large'}}>View Expenses After</Form.Label>
  
  <Form.Control 
  name='date'
  id="date"
  style={{ backgroundColor: '#fbe8d3', width: '10.5rem'}}
  className='m-2'
  type="date"
  onChange={this.handleBeginningDate}
  />
  <button
 
  style={{  backgroundColor: '#283c63', color: '#fbe8d3'}}
  className='m-2'
  onClick={this.setStartDateRange}
>
<FaCalendarMinus/> Filter  
</button>
 
  
</Col>



<Col xs={6}  style={{backgroundColor: '#3f88c5ff'}} >
<Form.Label style={{color:'white', fontSize: 'large'}}>View Expenses Before</Form.Label>
  <Form.Control
  name='date'
  className='m-2'

  id="date"
  style={{ backgroundColor: '#fbe8d3', width: '10.5rem'}}
  type="date"
  onChange={this.handleEndingDate}

  />
  <button
  className='m-2'
  style={{  backgroundColor: '#283c63', color: '#fbe8d3' }}
  onClick={this.setEndDateRange}
>
<FaCalendarMinus/> Filter 
</button>
</Col>
</Form.Row>
</Form>


  </div>
) : <p></p> }




{this.state.showSearchFilter ?
  
<form onSubmit={this.handleSearch} className='text-center' style={{backgroundColor: '#fdecd8ff'}}>

<input style={{width: '7rem'}} name='searchTerm' type='text' onChange={this.changeSearchTerm}/>
<button style={{backgroundColor: '#283c63', color: '#fbe8d3'}}><FaGlasses/> Search</button>
</form>
  : <p></p>}


 

</div>

<ExpensesArray email={this.props.email} items={this.state.items}/>

</div>
     )
 }



}

let ExpensesArray = (props)=>{

  let removeItem =(e)=>{
    let regex = /[a-z]/gmi
let realId = e.target.value
let realEmail = props.email
    let ddw ={
      testLocation: 'expenses/' + realEmail + '/' + realId
    }
  console.log(ddw)
    // let realId = this.props.props.props.match.params.id
    // let realEmail = this.props.props.props.match.params.email.match(regex).join('')    
  
    const itemsRef = firebase.database().ref('expenses/' + realEmail + '/' + realId)
    
    itemsRef.remove().then(()=>{
      alert('success')
      window.location.assign('/')
    }).catch((e)=>{
      console.log(`not deleted:`, e)
    })
  }
  


return(
  <div style={{backgroundColor: '#8fbfe0ff' }}>
  <ListGroup style={{backgroundColor: '#8fbfe0ff', listStyleType:'none', display:'flex',
  flexWrap: 'wrap',
  flexDirection:'row',
  justifyContent: 'center'
}} as='ul'>
  {props.items.map((m)=>{
    return (
      
      <Card
      key={m.id}
       
      style={{backgroundColor: '#1d8a99ff', color: '#fdecd8ff', width: '250px'}}   
      className=' text-wrap text-center m-1' 
     onDoubleClick={(e)=>{
      e.preventDefault()
      window.location.assign('/edit/'+ m.id + '/' + props.email)     }}
     >
     <div className='text-right'>
     <FaTimesCircle
     onClick={(e)=>{
       e.preventDefault()
       removeItem(e)
     }}

     onMouseOver={(e)=>{
       e.preventDefault()
       let style = e.target.style
       style.height = '4rem'
       style.width = '4rem'
       style.color ='#000000'
       setTimeout(()=>{
         style.height = '2rem'
         style.width = '2rem'
         style.color ='rgb(124, 30, 26)'
       }, 900)
     }}

     style={{ height: '2rem', width: '2rem ',  color:'rgb(124, 30, 26)'}}
     />
     </div>
    
     
      <Card.Body>
      <Card.Title>
      <h5 className='text-uppercase text-bold'>{m.expense}</h5>
      <Badge pill style={{backgroundColor: '#000000', color:' #15b344'}}>${m.amount}</Badge>

      </Card.Title>
      
<div>      {m.notes} 
</div>
      
      </Card.Body>
     
      <p>{moment(m.date).format("MMMM Do, YYYY")}</p>
      <div>
<button className='text-center btn rounded rounded-circle p-2' style={{height: '4rem', width: '8rem', 
color:'rgb(245, 222, 196)', backgroundColor: '#283c63'}} 
onMouseOver={(e)=>{
e.preventDefault()
let style = e.target.style
style.backgroundColor = 'rgb(10, 0, 63)'
setTimeout(()=>{
style.backgroundColor = '#283c63'

},300)
setTimeout(()=>{
  style.backgroundColor = 'rgb(10, 0, 63'
  
  },500)
  setTimeout(()=>{
    style.backgroundColor = '#283c63'
    
    },700)
}}
>

<FaShareSquare onClick={(e)=>{
  e.preventDefault()
  window.location.assign('/edit/'+ m.id + '/' + props.email)
}}
style={{ height: '1.5rem', width: '1.5rem ', backgroundColor: '#283c63', color: 'rgb(245, 222, 196)'}} 
className='m-2'
/> Update
</button>

</div>
      </Card>

    )
  })}
 
</ListGroup>

  </div>




)


}

let ExpensesWrapper =()=>{
  let { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  let [userMetadata, setUserMetadata] = useState(null);
  
 
 
  useEffect(() => {
    let getUserMetadata = async () => {
      let domain = "dev-sg8fbv3t.us.auth0.com";
      let myToken
      try {
        let accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
        let userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        let metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        let { user_metadata } = await metadataResponse.json();
  console.log(accessToken)
  myToken = accessToken
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    
    
  
    getUserMetadata();
  }, []);
// add isLoading prop
// mayebe add summary conditionally below

let realEmail = (user) ? user.email : 'testtestcom'
  return( 
    <div>
      
      <ExpenseDashboard  email={realEmail} auth={isAuthenticated}/>
      </div>
)
}


export default ExpensesWrapper