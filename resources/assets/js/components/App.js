import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import { HashRouter , Link } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';

import Companies from './companies/Companies';
import CompaniesResource from './companies/CompaniesResource';

import Employees from './employees/Employees';
import EmployeesResource from './employees/EmployeesResource';

import PrivateRoute from './middlewares/PrivateRoute';
import GuestRoute from './middlewares/GuestRoute';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: '',
            auth: localStorage.getItem('token'),
        };
        this.getToken = this.getToken.bind(this);
    }

    getToken(token){
        this.setState({auth: token});
    }
    
    render() {
        let auth = !!this.state.auth;
        return (
            <div>
                <div>
                    {auth && (<Navbar logout={this.getToken}/>)}

                    <GuestRoute auth={auth} exact path="/login" component={Login} getToken={this.getToken}/>

                    <Switch>

                        //    __________ PrivateRoute for Home _____________________

                        <PrivateRoute auth={auth} exact path='/' component={Home} />

                        //    __________ PrivateRoutes for Companies _______________

                        <PrivateRoute auth={auth} exact path='/companies' component={Companies} />
                        <PrivateRoute auth={auth} exact path='/companies/create' component={CompaniesResource} />
                        <PrivateRoute auth={auth} exact path='/companies/show/:id' component={CompaniesResource} />
                        <PrivateRoute auth={auth} exact path='/companies/edit/:company' component={CompaniesResource} />

                        //    __________ PrivateRoutes for Employess _______________

                        <PrivateRoute auth={auth} exact path='/employees' component={Employees} />
                        <PrivateRoute auth={auth} exact path='/employees/create' component={EmployeesResource} />
                        <PrivateRoute auth={auth} exact path='/employees/show/:id' component={EmployeesResource} />
                        <PrivateRoute auth={auth} exact path='/employees/edit/:employee' component={EmployeesResource} />
                    </Switch>
                </div>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(
         <HashRouter>
            <App />
         </HashRouter>
        , document.getElementById('app'));
}

