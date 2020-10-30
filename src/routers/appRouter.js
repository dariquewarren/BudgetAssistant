import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ExpenseForm from '../components/expenseForm'
import EditExpense from '../components/editExpense'
import Header from '../components/header'
import ExpenseDashboard from '../components/expenseDashboard'
import Login from '../components/login'
import Logout from '../components/logout'



const AppRouter =() => {


  return (
    
  
    <BrowserRouter>
    <div>
    <Header />
    <Switch>
    <Route path="/"  component={ExpenseDashboard} exact={true}/>
    <Route path="/create" component={ExpenseForm} />
    <Route path="/edit/:id" component={EditExpense} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    </Switch>
    </div>      
    </BrowserRouter>
    
  )
}


export default AppRouter