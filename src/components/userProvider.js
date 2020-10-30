import UserContext from './userContext'


class UserProvider extends Component{
    state ={

email: 'dwarrennycprotonmailcom'

    }

render() {
    return(

<UserContext
value={this.state.email}

>
{this.props.children}
</UserContext>

    )
}


}