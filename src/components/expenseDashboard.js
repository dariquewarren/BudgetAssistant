import React, {useState,useEffect} from "react";
import "../App.css";
import firebase from "../firebase";
import {Badge} from "react-bootstrap";
import { TextField} from "@material-ui/core";
import moment from "moment";
import { FaGlasses, FaMinusCircle, FaPlayCircle, 
  FaCalendarAlt, FaCalendarMinus,
   FaCalendarPlus, FaSort,
    FaSortAmountUp, FaSortAmountDown, FaSortAlphaDownAlt, FaSortAlphaUpAlt} from 'react-icons/fa'
import {BsFillGearFill} from 'react-icons/bs'
import LoginButton from '../components/loginButton'
import UserContext from './userContext'
import { useAuth0 } from "@auth0/auth0-react";





class ExpenseDashboard extends React.Component {
 constructor(props){
    super(props);
    this.state = {
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
 

    this.myExpenses = this.myExpenses.bind(this)
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
   
// log is loading prop to console via conditional
console.log('see about delay when logging in. consider, isLoading prop') 
  console.log('state-email', this.props.auth)

  let regex = /[a-z]/gmi
   
  let expenseEmail = this.props.email.match(regex).join('')
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
      });
    }

    console.log(newState)

    let amountArray = [];
    newState.forEach((e)=>{
      return amountArray.push(e.amount)
    })

    let ddw = amountArray.reduce((total, currentValue) => {
      return total + currentValue;
    });

    console.log(amountArray);
    this.setState({ items: newState, expensesTotal: ddw });
    
  });


  
  }

myExpenses=()=>{
  let quickTest = `${this.props.email}`
  let myExpensesRef =  firebase.database().ref('expenses').orderByKey() 
  
  myExpensesRef.on("value", (snapshot) => {
    let items = snapshot.val();

    let newState = [];
console.log('quick test items',items)

for (let item in items) {
if(item == this.props.email){
  newState = items[item]
} 
  
}

let trueState = []
for (let expense in newState) {
  trueState.push({
    id: expense,
    expense: newState[expense].expense,
    notes: newState[expense].notes,
    date: newState[expense].date,
    amount: newState[expense].amount,
  });
}

console.log('new state', newState)
console.log('true state', trueState)
let emailString = this.props.email.toString()

console.log('email string', `${emailString}`)

// let myRegex = new RegExp(`${emailString}`, 'gmi')
// let ddw = newState.filter((f)=>{
//   return f.owner.match(myRegex)
// })

// console.log('filter state', ddw)


    
    
  });

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
      return a.amount - b.amount;
    });
    this.setState({ items: newItems });
  };

  sortAmountHighLow = () => {
    let real = this.state.items;
    let newItems = real.sort((a, b) => {
      return b.amount - a.amount;
    });
    this.setState({ items: newItems });
  };

  sortDateLowHigh = () => {
    let regex = /[a-z]/gmi
    let expenseEmail = this.state.email.match(regex).join('')
    let myExpensesRef = (this.props.auth) ? firebase.database().ref("expenses/" + expenseEmail) : firebase.database().ref("expenses/testtestcom")
    
    
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
    let expenseEmail = this.state.email.match(regex).join('')
    let myExpensesRef = (this.props.auth) ? firebase.database().ref("expenses/" + expenseEmail) : firebase.database().ref("expenses/testtestcom")
    
    
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
    let expenseEmail = this.state.email.match(regex).join('')
    let myExpensesRef = (this.props.auth) ? firebase.database().ref("expenses/" + expenseEmail) : firebase.database().ref("expenses/testtestcom")
    
    

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
        if (regex.test(f.expense.toUpperCase())) {
          filterState.push(f);
        }
      });
console.log('filter state', filterState)
      let expenseArray = [];

      filterState.forEach((e) => {
        expenseArray.push(parseInt(e.amount, 10));
      });

      let dummyArray = [1,2,3];

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
    let expenseEmail = this.state.email.match(regex).join('')
    let myExpensesRef = (this.props.auth) ? firebase.database().ref("expenses/" + expenseEmail) : firebase.database().ref("expenses/testtestcom")
    
    

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

      let dummyArray = [1,2,3];

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
    let expenseEmail = this.state.email.match(regex).join('')
    let myExpensesRef = (this.props.auth) ? firebase.database().ref("expenses/" + expenseEmail) : firebase.database().ref("expenses/testtestcom")
    
    
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
<button
onClick={this.myExpenses}
>MY EXPENSE</button>
  <div>
  {this.state.list.map((item) => {
    return(
      <div>
        {item}
      </div>
    );
  })}
  </div>
 




<div style={{backgroundColor: '#393e46', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>

<div style={{width: '300px'}}>
  <div style={{backgroundColor: '#fbe8d3'}} className="card  shadow h-100 py-2 m-2">

    <div className="card-body">
    <h4 className='text-center'>Summary</h4> 
    <div style={{color: '#283c63'}} className="text-xs font-weight-bold text-uppercase text-center mb-1">
    
    {this.state.items.length} Expenses Totalling ${this.state.expensesTotal}

    
      </div>

      <div className="row no-gutters align-items-center">

        <div className="col mr-2">
        <h5>Budget: 
        <br></br>
        <Badge pill className='text-right' style={{color: '#0f6e14'}} >
        ${this.state.budget}
        </Badge>     </h5>  
        
        <h5>
        
        Surplus:
        <Badge pill className='text-right' style={{color: '#0f6e14'}} >
        ${isNaN(parseInt(this.state.budget, 10).toFixed(2)) === false ? parseInt(this.state.budget, 10).toFixed(2) - parseInt(this.state.expensesTotal, 10).toFixed(2) : (0)  } 
        </Badge>
        </h5>
         
        
         
        </div>

        <div className="col mr-2">
        <div className="text-xs font-weight-boldtext-uppercase mb-1" 
        
        style={{color: '#283c63'}}>Set Budget </div>
<form  onSubmit={this.setBudget}>
<input style={{width: '7rem'}} name='budgetAmount' type='number' value={this.state.budget} min='.01' step='.01' onChange={this.handleBudget} onClick={(e)=>{e.preventDefault(); e.target.value=''}} />    
<button style={{backgroundColor: ' #283c63', color: '#fbe8d3', width: '100%'}}>Set</button>
</form>
 </div>


      </div>
      <h6 className='text-right mt-4'> 
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
          </h6> 
    </div>
  </div>
</div>


{this.state.showGeneralOptions ?
  
  <div  
  style={{backgroundColor: '#fbe8d3', width: '350px'}}
  >
  <div className="text-xs font-weight-bold text-center text-uppercase mb-1" style={{color: '#283c63'}}>
        Sort And Filter 
        </div>
  <div
  style={{backgroundColor: ' #212121'}}
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

<div style={{backgroundColor: '#393e46', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>


{this.state.showDateFilters ? (
  <div className='text-center' 
  style={{backgroundColor: '#393e46', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
   <div className ='m-3 ' style={{backgroundColor: '#393e46'}}>
   <p style={{color: '#fbe8d3'}} > Expenses After</p>
   <TextField
   id="date"
   name="date"
   style={{backgroundColor: '#fbe8d3', width: '8rem' }}

   type="date"
   onChange={this.handleBeginningDate}
   InputLabelProps={{
     shrink: true,
   }}
 />
 

 <button
 style={{  backgroundColor: '#283c63', color: '#fbe8d3', height: '2rem' }}
 onClick={this.setStartDateRange}
>
<p><FaCalendarPlus/> Filter</p>  
</button>
 
   
   </div>
  
<div className ='m-3' style={{backgroundColor: '#393e46'}}>
<p style={{color: '#fbe8d3'}} > Expenses Before</p>
   
   <TextField
   id="date"
   name="date"
   style={{ backgroundColor: '#fbe8d3', width: '8rem'}}
   type="date"
   onChange={this.handleEndingDate}
   InputLabelProps={{
     shrink: true,
   }}
 />
  
  <button
 
  style={{  backgroundColor: '#283c63', color: '#fbe8d3', height: '2rem' }}
  onClick={this.setEndDateRange}
>
<p><FaCalendarMinus/> Filter</p>  
</button>


</div>


   

  </div>
) : <p></p> }




{this.state.showSearchFilter ?
  
<form onSubmit={this.handleSearch} style={{backgroundColor: '#393e46'}}>
<p style={{color: '#fbe8d3'}}>Expense Name</p>
<input style={{width: '7rem'}} name='searchTerm' type='text' onChange={this.changeSearchTerm}/>
<button style={{backgroundColor: '#283c63', color: '#fbe8d3'}}><FaGlasses/> Search</button>
</form>
  : <p></p>}


  {this.state.showSortOptions 
? <div style={{backgroundColor: '#393e46', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
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

</div>

<ExpensesArray items={this.state.items}/>

</div>
     )
 }



}

let ExpensesArray = (props)=>{

return(
  <div>
  {  props.items ? <ul style={{backgroundColor: '#393e46', listStyleType:'none'}}>
  {
  props.items.map((m)=>{
      return (
       
  m.expense &&
  <button
  key={m.id} 
  style={{backgroundColor: '#60316e', height: '15rem', width: '20rem'}}   
  className=' text-wrap text-center m-2 p-1' 
  onClick={(e)=>{
    e.preventDefault()
    window.location.assign(`/edit/` + m.id)
  
  
  }}
  
  >
  <h4 style={{color: '#fbe8d3'}}>
  {m.expense}
  </h4>
  
  <div  
  style={{backgroundColor: '#60316e'}}
  >
  <h5 style={{color: '#078d1e'}}>${m.amount}</h5>
  <div
  style={{backgroundColor: '#60316e'}}
  className="card ">
  
  <div  className="card-body">      
        
          <div className="text-xs font-weight-bold text-warning text-uppercase ">
          <h6 style={{color: '#090030'}}>Notes</h6>
          <h5 style={{color:'#fbe8d3'}} className='text-center text-wrap'>{m.notes}</h5> 
          
      </div>
      
    </div>
    
  </div>
  <h6 style={{color: '#090030'}} className='text-center'>{m.date}</h6>
  
  </div>
  
  <h5 style={{color: '#29a19c'}}>Click To Edit/Delete</h5>
        
  </button>
  
      )
  })
  
  
  }
  </ul>
   :  <div>nope</div>}
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