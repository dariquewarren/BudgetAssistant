import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import FormProper from '../components/expenseForm'
import EditExpenseWrapper from '../components/editExpense'
import Header from '../components/header'
import ExpensesWrapper from '../components/expenseDashboard'
import Login from '../components/login'
import Logout from '../components/logout'


  class AppRouter extends React.Component {
    render() {
      const App = () => (
        <div>
    <Header />
    <Switch>
    <Route path="/"  component={ExpensesWrapper} exact={true}/>
    <Route path="/create" component={FormProper} />
    <Route path="/edit/:id" component={EditExpenseWrapper} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    </Switch>
    </div>
      )
      return (
        <BrowserRouter>
        <Switch>
        <App/>  

        </Switch>
    </BrowserRouter>
       
      );
    }
  }

export default AppRouter