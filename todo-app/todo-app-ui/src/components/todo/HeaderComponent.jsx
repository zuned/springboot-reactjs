import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';


class HeaderComponent extends Component {
    render() {
        const isAuthenticated = AuthenticationService.isAuthenticated();
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="zuned.com" className="navbar-brand">Zuned</a></div>
                    <ul className="navbar-nav">
                        { isAuthenticated && <li><Link className="nav-link" to="/welcome/zuned">Home</Link></li>}
                        { isAuthenticated && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end" > 
                        {!isAuthenticated && <li ><Link className="nav-link" to="/login">login</Link></li>}
                        { isAuthenticated && <li ><Link className="nav-link" to="/logout"  onClick={AuthenticationService.clearSessionOnLogout} >logout</Link></li>}
                    </ul>
                </nav>
               
            </header>
            
        )
    }
}

export default withRouter(HeaderComponent);