import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';

class LoginComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            username :'' ,
            password : '',
            hasLoginFailed : false,
            showSuccessMessage : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClick = this.loginClick.bind(this);
    }

    handleChange(event) {
        console.log(this.state);
        this.setState({[event.target.name]:event.target.value });
    }

    loginClick() {
        console.log(this.state);
        // if(this.state.username === 'zuned' && this.state.password === 'ahmed'){
        //     AuthenticationService.onLoginSuccess(this.state.username);
        //     // this.setState({showSuccessMessage : true ,hasLoginFailed : false });
        //     this.props.history.push(`/welcome/${this.state.username}`);
        // }else {
        //     this.setState({showSuccessMessage : false ,hasLoginFailed : true});
        // }

        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then(()=> {
        //     AuthenticationService.onLoginSuccess(this.state.username,this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // })
        // .catch( () =>{
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // })

        AuthenticationService
        .executeJwtAuthenticationService(this.state.username, this.state.password)
        .then((response) => {
            AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
            this.props.history.push(`/welcome/${this.state.username}`)
        }).catch(() => {
            this.setState({ showSuccessMessage: false })
            this.setState({ hasLoginFailed: true })
        })


    }
   
 render() {
     return (
         <div className="container">
             <h1>Login</h1>
            {/*<ShowInvalidMessage hasLoginFailed={this.state.hasLoginFailed} /> */}
            {this.state.hasLoginFailed&&<div className="alert alert-warning">Invalid Credentials.</div>}
            {/*<ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage} />*/}
            {this.state.showSuccessMessage&&<div>Login Successfull.</div>}
            User Name : <input type="text" name="username" value={this.username} placeholder="username" onChange={this.handleChange} />
            Password : <input type="password" name="password" value={this.password} placeholder="password" onChange={this.handleChange} />
            <button className="btn btn-primary"  onClick={this.loginClick}>Login</button> 
         </div>
     )
 }
}

// function ShowInvalidMessage(props) {
//     if(props.hasLoginFailed)
//         return <div>Invalid Credentials.</div>
//     return null;
// }
// function ShowSuccessMessage(props) {
//     if(props.showSuccessMessage)
//         return <div>Login Successfull.</div>
//     return null;
// }

export default LoginComponent;