import React from 'react'
import { NavLink} from 'react-router-dom'
import Profile from '../components/profile'
import LoginButton from '../components/loginButton'
import LogoutButton from '../components/logoutButton'


const Header = ()=> (
 
    <header style={{backgroundColor: '#60316e'}}>
    
    <h1 style={{color:'#fbe8d3'}} className='text-center'>Budget Buddy</h1>
    <LoginButton/>
    <LogoutButton/>
 <div className='text-center' >
 <NavLink to="/" style={{color: '#29a19c', margin: '1rem'}} exact={true}>Budget Summary</NavLink>
 <NavLink to="/create" style={{color: '#29a19c', margin: '1rem'}} >Create Expense</NavLink>
 </div>

    </header>
    
    )


export default Header 