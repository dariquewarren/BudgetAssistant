import React from "react";
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
var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://dev-sg8fbv3t.us.auth0.com/oauth/token',
  mode: 'no-cors',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: {
    grant_type: 'client_credentials',
    client_id: 'YsUPHTB3zq0gdAuAAd41YYi0ffnwvYEI',
    client_secret: '3f7EwPwQ0hIgnDAzaatlgzIv6xFmvOg_UkVGYMwoaScVaWp4M17Hh3byYEIp8JbP',
    audience: 'https://dev-sg8fbv3t.us.auth0.com/api/v2/'
  }
};

const itemsRef = firebase.database().ref("expenses");




class ExpenseDashboard extends React.Component {
 constructor(){
    super();
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
 static contextType = UserContext
 componentDidMount() {
const email = this.context
console.log(email)
axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});




    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      for (let item in items) {
        newState.push({
          id: item,
          expense: items[item].expense,
          notes: items[item].notes,
          date: moment(items[item].date).format("MMM Do"),
          amount: items[item].amount,
        });
      }

      
      const amountArray = [];
      newState.forEach((e) => {
        amountArray.push(parseFloat(e.amount,10));
      });

      const ddw = amountArray.reduce((total, currentValue) => {
        return total + currentValue;
      });

      console.log(amountArray);
      this.setState({ items: newState, expensesTotal: ddw });
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
    const show = this.state.showDateFilters;
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
    const show = this.state.showSortOptions;
    this.setState({
      showSortOptions: !show,
      showDateFilters: false,
      showSearchFilter: false,
    });
  };
  sortAmountLowHigh = () => {
    const real = this.state.items;
    const newItems = real.sort((a, b) => {
      return a.amount - b.amount;
    });
    this.setState({ items: newItems });
  };

  sortAmountHighLow = () => {
    const real = this.state.items;
    const newItems = real.sort((a, b) => {
      return b.amount - a.amount;
    });
    this.setState({ items: newItems });
  };

  sortDateLowHigh = () => {
    itemsRef.on("value", (snapshot) => {
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

      const newItems = newState.sort((a, b) => {
        return parseInt(a.date, 10) - parseInt(b.date, 10);
      });

      const realState = [];

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
    itemsRef.on("value", (snapshot) => {
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

      const newItems = newState.sort((a, b) => {
        return parseInt(b.date, 10) - parseInt(a.date, 10);
      });

      const realState = [];

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
    const searchTerm = this.state.searchTerm;
    console.log("search term", searchTerm);

    itemsRef.on("value", (snapshot) => {
      const items = snapshot.val();
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
      const filterState = [];

      newState.forEach((f) => {
        const regex = new RegExp(searchTerm.toUpperCase());
        if (regex.test(f.expense.toUpperCase())) {
          filterState.push(f);
        }
      });
console.log('filter state', filterState)
      const expenseArray = [];

      filterState.forEach((e) => {
        expenseArray.push(parseInt(e.amount, 10));
      });

      const dummyArray = [0];

      const expensesTotal =
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
    this.setState({
        items: []
    })
    itemsRef.on("value", (snapshot) => {
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

      
      const newArray = newState.filter((f) => {
        return (
          moment(f.date).format("X") > moment(this.state.startDate).subtract(1, 'day').format("X")
        );
      });

      console.log("Filtered Array", newArray);

      const expenseArray = [];

      newArray.forEach((e) => {
        expenseArray.push(parseInt(e.amount, 10));
      });

      const dummyArray = [0];

      const expensesTotal =
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
    itemsRef.on("value", (snapshot) => {
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
      const newArray = newState.filter((f) => {
        return(
          moment(f.date).format("X") <= moment(this.state.endDate).format("X")
        )
      });
      console.log("filtered array", newArray);
      const expenseArray = [];

      newArray.forEach((e) => {
        expenseArray.push(parseInt(e.amount, 10));
      });

      const finalArray = []
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
      const dummyArray = [0];

      const expensesTotal =
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
    const value = e.target.value;

    console.log(value);
    this.setState({
      startDate: value,
    });
  };

  handleEndingDate = (e) => {
    const value = e.target.value;

    this.setState({
      endDate: value,
    });
  };

    render(){
     return (
<div>
<LoginButton/>

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


<ul style={{backgroundColor: '#393e46', listStyleType:'none'}}>
{
this.state.items.map((m)=>{
    return (
     

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
{m.expense.toUpperCase()}
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


</div>
     )
 }



}


export default ExpenseDashboard