import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import { HashRouter , Link } from 'react-router-dom';
// import { HashRouter , Link } from 'react-router-dom';
// import { Router, Route, Switch, Redirect } from 'react-router';


export default class Login extends Component {
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
        axios.post('/api/auth/login', formData, {headers:{'Content-Type': 'multipart/form-data' }}).then(response => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.data.token;
            this.setState({
                token: response.data.data.token,
                auth: true,
            })
            localStorage.setItem("token", response.data.data.token);
            this.props.getToken(localStorage.getItem("token"));
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
    	let redirect;
    	if(this.state.auth) {
            redirect =  <Redirect to="/" />;
            // return <Redirect to={"/companies"} />;
        }
        return (
        	<div className="container">
        		{redirect}
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
        );
    }
}
