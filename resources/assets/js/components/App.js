import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import { HashRouter , Link } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';

import Companies from './companies/Companies';
import CompaniesCreate from './companies/CompaniesCreate';

import Employees from './employees/Employees';
import EmployeesCreate from './employees/EmployeesCreate';

import PrivateRoute from './companies/PrivateRoute';
import GuestRoute from './companies/GuestRoute';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: '',
            auth: localStorage.getItem('token'),
        };
        this.getToken = this.getToken.bind(this);
    }
    // componentDidMount() {
    //     console.log(localStorage.getItem('token'));
    //     this.setState({ auth: localStorage.getItem('token') })
    // }
    // componentWillRecieveProps()
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if(nextProps.token != this.props.token) {
    //         this.setState({id: nextProps.id})
    //     }
    // }

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
                            <PrivateRoute auth={auth} exact path='/' component={Home} />

                            //    __________ Routes for Companies _______________

                            <PrivateRoute auth={auth} exact path='/companies' component={Companies} />
                            <PrivateRoute auth={auth} exact path='/companies/create' component={CompaniesCreate} />
                            <PrivateRoute auth={auth} exact path='/companies/show/:id' component={CompaniesCreate} />
                            <PrivateRoute auth={auth} exact path='/companies/edit/:company' component={CompaniesCreate} />

                            //    __________ PrivateRoutes for Employess _______________

                            <PrivateRoute auth={auth} exact path='/employees' component={Employees} />
                            <PrivateRoute auth={auth} exact path='/employees/create' component={EmployeesCreate} />
                            <PrivateRoute auth={auth} exact path='/employees/show/:id' component={EmployeesCreate} />
                            <PrivateRoute auth={auth} exact path='/employees/edit/:employee' component={EmployeesCreate} />
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

