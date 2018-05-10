import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import Companies from './companies/Companies';


export default class Home extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="container">
			    <div className="row justify-content-center">
			        <div className="col-md-8">
			            <div className="card">
			                <div className="card-header">Dashboard</div>

			                <div className="card-body">
			                        <div className="alert alert-success">
			                        </div>

			                    You are logged in!
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
        );
    }
}
