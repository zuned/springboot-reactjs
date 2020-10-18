import React, {Component} from 'react';
import { BrowserRouter as Router ,Route ,Switch ,Link } from 'react-router-dom';

class TodoApp extends Component {
    render () {
        return (
            <div className="TodoApp" >
               <Router>
                   <>
                   <HeaderComponent></HeaderComponent>
                   <Switch>
                    <Route path="/" exact component={LoginComponent} />
                    <Route path="/login" component={LoginComponent} />
                    <Route path="/welcome/:name" component={WelcomeComponent} />
                    <Route path="/todos" component={ListTodoComponent} />
                    <Route component={ErrorComponent} />
                   </Switch>
                   <FooterComponent></FooterComponent>
                   </>
               </Router>
               
            </div>
        )
    }
}

class ListTodoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos : [
            {id:"1" ,description:"Learn Angular",done:false , targetDate : new Date()},
            {id:"2" ,description:"Learn React",done:false , targetDate : new Date()},
            {id:"3" ,description:"Learn Kafka",done:false , targetDate : new Date()},
            {id:"4" ,description:"Learn Distributed Architechture",done:false , targetDate : new Date()}
        ]
        }
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Date of Completion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map (
                             todo=> 
                             <tr>
                                 <td>{todo.id}</td>
                                 <td>{todo.description}</td>
                                 <td>{todo.done.toString()}</td>
                                 <td>{todo.targetDate.toString()}</td>
                             </tr>   
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="zuned.com" className="navbar-brand">Zuned</a></div>
                    <ul className="navbar-nav">
                        <li className="nav-link"><Link to="/welcome/zuned">Home</Link></li>
                        <li className="nav-link" ><Link to="/todos">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end" > 
                        <li className="nav-link"><Link to="/login">login</Link></li>
                        <li className="nav-link"><Link to="/logout">logout</Link></li>
                    </ul>
                </nav>
               
            </header>
            
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <hr/> Footer
            </div>
            
        )
    }
}

class WelcomeComponent extends Component {
       render() {
        return (
        <div> 
            <h3>Welcome {this.props.match.params.name}</h3>
           <p>You can manage your todos <Link to="/todos">here</Link></p>
        </div>
        )
    }
}

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
        if(this.state.username === 'zuned' && this.state.password === 'ahmed'){
            // this.setState({showSuccessMessage : true ,hasLoginFailed : false });
            this.props.history.push(`/welcome/${this.state.username}`);
        }else {
            this.setState({showSuccessMessage : false ,hasLoginFailed : true});
        }
    }
   
 render() {
     return (
         <div>
            {/*<ShowInvalidMessage hasLoginFailed={this.state.hasLoginFailed} /> */}
            {this.state.hasLoginFailed&&<div>Invalid Credentials.</div>}
            {/*<ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage} />*/}
            {this.state.showSuccessMessage&&<div>Login Successfull.</div>}
            User Name : <input type="text" name="username" value={this.username} placeholder="username" onChange={this.handleChange} />
            Password : <input type="password" name="password" value={this.password} placeholder="password" onChange={this.handleChange} />
            <button onClick={this.loginClick}>Login</button> 
         </div>
     )
 }
}

function ErrorComponent() {
    return <div>An Error Occured.</div>
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


export default TodoApp;