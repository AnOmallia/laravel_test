import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter , Link } from 'react-router-dom';
import { Router, Route, Switch, Redirect } from 'react-router';


export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            auth: localStorage.getItem('token'),
            redirect: false,
        };
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
    }
    handleLogOutClick(e) {
        e.preventDefault();

        axios.post('api/user/logout', {token: localStorage.getItem('token')}).then(response => {
            axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
            this.setState = {
            redirect: true
        };

        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={"/"} />;
        }
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Home</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to="/companies">Companies</Link></li>
                        <li><Link to="/employees">Employees</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a onClick={this.handleLogOutClick}><span className="glyphicon glyphicon-log-in"></span> Log Out</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
