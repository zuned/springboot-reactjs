import React, {Component} from 'react';
import { BrowserRouter as Router ,Route ,Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LoginComponent from './LoginComponent.jsx';
import ListTodoComponent from './ListTodoComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import TodoComponent from './TodoComponent';

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
                    <AuthenticatedRoute  path="/welcome/:name" component={WelcomeComponent} />
                    <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                    <AuthenticatedRoute path="/todos" component={ListTodoComponent} />
                    <Route path="/logout" component={LogoutComponent} />
                    <Route component={ErrorComponent} />
                   </Switch>
                   <FooterComponent></FooterComponent>
                   </>
               </Router>
               
            </div>
        )
    }
}

export default TodoApp;