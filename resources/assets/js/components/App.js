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
     constructor(props){
        super(props);
        this.state = {
            token: '',
            auth: localStorage.getItem('token'),
        };
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleLoginClick(e) {
        e.preventDefault();
        let form = document.forms.namedItem("loginForm");
        let formData = new FormData(form);
        axios.post('/api/user/login', formData, {headers:{'Content-Type': 'multipart/form-data' }}).then(response => {
            console.log(response);
            this.setState({
                token: response.data.data.token,
                auth: true,
            })
            localStorage.setItem("token", response.data.data.token);
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        if(!this.state.auth) {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">""</div>

                                <div className="card-body">
                                    <form name="loginForm"> 

                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-4 col-form-label text-md-right">E-Mail Address</label>
                                            <div className="col-md-6">
                                                <input id="email" type="email" className="form-control" name="email" required autoFocus />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" className="form-control" name="password" required />
                                            </div>
                                        </div>

                                        <div className="form-group row mb-0">
                                            <div className="col-md-8 offset-md-4">
                                                <button className="btn btn-primary" onClick={this.handleLoginClick}>Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else{
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
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

