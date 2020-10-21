import React from 'react';
import '../App.css';
import firebase from '../firebase'
import {TextField} from '@material-ui/core'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import LoginButton from '../components/loginButton'

class Login extends React.Component{
    render(){

        return(
            <div>
            <LoginButton/>
            </div>
        )
    }
}


export default Login