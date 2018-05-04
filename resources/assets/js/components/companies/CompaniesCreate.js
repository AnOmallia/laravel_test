import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
//import { Redirect } from 'react-router-dom'
//import { Route, Redirect } from 'react-router';

export default class CompaniesCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            data: "",
            name: "",
            email: "",
            website: "",
            img: "",
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
	    e.preventDefault();
	    //let form = $('form')[0];
	    let form = document.forms.namedItem("compForm");
		let formData = new FormData(form);
		
		axios.post('/api/company', formData, {headers:{'Content-Type': 'multipart/form-data' }}).then(response => {
            this.setState({
                data: response.data,
                redirect: true,
                name: response.data.name,
                email: response.data.email,
                website: response.data.website,
                img: response.data.img,
            })
            console.log(this.state)
        }).catch(error => {
            console.log(error);
        })
	}
    render() {
	    	let img = this.state.img !== "" ? 
		        (<img src={`storage/logos/${this.state.data}`} alt="logo" width="100px" height="100px"/>)
		    : 
		      (null)
		    ;

        if(this.state.redirect){
			return <Redirect to='/companies' />;
        }
        return (
            <div className="container">
			    <div className="row justify-content-center">
			        <div className="col-md-8">
			            <div className="card">
			                <div className="card-header">Add Companie</div>
			                <div className="card-body">
			                	<form action="#" name="compForm">
				                	<div className="form-group">
										<label htmlFor="firstName">Company name:</label>
										<input type="text" name="name" className="form-control" id="firstName" />
									</div>
									<div className="form-group">
										<label htmlFor="email">Email address:</label>
										<input type="email" name="email" className="form-control" id="email" />
									</div>
									<div className="form-group">
										<label htmlFor="company">Website:</label>
										<input type="text" name="website" className="form-control" id="company" />
									</div>
									
									<div className="form-group">
										<label htmlFor="logo">Company logo:</label>
										<input type="file" name="logo" className="form-control" id="logo" />
									</div>
									{img}
									<button type="submit" className="btn btn-default" onClick={this.handleClick}>Save</button>
								</form>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
        );
    }
}

// if (document.getElementById('app')) {
//     ReactDOM.render(<Create />, document.getElementById('app'));
// }