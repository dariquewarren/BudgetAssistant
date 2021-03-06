import React from 'react'
import { NavLink} from 'react-router-dom'
import Profile from '../components/profile'
import LoginButton from '../components/loginButton'
import LogoutButton from '../components/logoutButton'


const Header = ()=> (
 
    <header style={{backgroundColor: '#7c77b9ff'}} className='p-3'>
    
    <h1 style={{color:'#fbe8d3'}} className='text-center'>Budget Buddy</h1>
   
 <div className='text-center' >
 <NavLink to="/" style={{color: '#fdecd8ff', margin: '1rem', textDecoration: 'underline'}} className=' p-1 m-2' exact={true}>Budget Summary</NavLink>
 <NavLink to="/create" style={{color: '#fdecd8ff', margin: '1rem', textDecoration: 'underline'}} className=' p-1 m-2' >Create Expense</NavLink>
 </div>

    </header>
    
    )


export default Header 