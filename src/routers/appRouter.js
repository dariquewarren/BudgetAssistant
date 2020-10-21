import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ExpenseForm from '../components/expenseForm'
import EditExpense from '../components/editExpense'
import Header from '../components/header'
import ExpenseDashboard from '../components/expenseDashboard'
const AppRouter =() => (
    <BrowserRouter>
    <div>
    <Header />
    <Switch>
    <Route path="/"  component={ExpenseDashboard} exact={true}/>
    <Route path="/create" component={ExpenseForm} />
    <Route path="/edit/:id" component={EditExpense} />
    
    </Switch>
    </div>      
    </BrowserRouter>
  )


export default AppRouter