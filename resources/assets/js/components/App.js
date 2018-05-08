import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { HashRouter , Link } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';

import Companies from './companies/Companies';
import CompaniesCreate from './companies/CompaniesCreate';

import Employees from './employees/Employees';
import EmployeesCreate from './employees/EmployeesCreate';

export default class App extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                <div>
                    <Navbar />
                        <Switch>
                            <Route exact path='/' component={Home} />

                        //    __________ Routes for Companies _______________

                            <Route exact path='/companies' component={Companies} />
                            <Route exact path='/companies/create' component={CompaniesCreate} />
                            <Route exact path='/companies/show/:id' component={CompaniesCreate} />
                            <Route exact path='/companies/edit/:company' component={CompaniesCreate} />

                        //    __________ Routes for Employess _______________

                            <Route exact path='/employees' component={Employees} />
                            <Route exact path='/employees/create' component={EmployeesCreate} />
                            <Route exact path='/employees/show/:id' component={EmployeesCreate} />
                            <Route exact path='/employees/edit/:employee' component={EmployeesCreate} />
                        </Switch>
                    </div>
                </HashRouter>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

