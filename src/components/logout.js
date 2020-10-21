import React from 'react';
import '../App.css';
import firebase from '../firebase'
import {TextField} from '@material-ui/core'
import {Button} from 'react-bootstrap'
import moment from 'moment'
import LogoutButton from '../components/logoutButton'



class Logout extends React.Component{
    render(){

        return(
            <div>
            <LogoutButton/>
            </div>
        )
    }
}


export default Logout