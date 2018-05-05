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
            id: "",
            name: "",
            email: "",
            website: "",
            logo: "",
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        if(typeof this.props.match.params.id !== "undefined"){
        	this.getData(this.props.match.params.id);
        }
        if(typeof this.props.match.params.company !== "undefined"){
        	this.getData(this.props.match.params.company);
        }
        //console.log(typeof this.props.match.params.id)
        //console.log(this.props.match.params.valueOf.length)
    }

    getData(id){
    	axios.get(`/api/company/${id}`).then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                website: response.data.website,
                logo: response.data.logo,
            })
            // console.log(response.data)
        }).catch(error => {
            // console.log(error);
        })
    }
    /*editData(id){
    	axios.get(`/api/company/${id}`).then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                website: response.data.website,
                logo: response.data.logo,
            })
            // console.log(response.data)
        }).catch(error => {
            // console.log(error);
        })
    }*/

    handleClick(e) {
	    e.preventDefault();
	    let form = document.forms.namedItem("compForm");
		let formData = new FormData(form);
		
		axios.post('/api/company', formData, {headers:{'Content-Type': 'multipart/form-data' }}).then(response => {
            this.setState({
                id: response.data,
                redirect: true,
                name: response.data.name,
                email: response.data.email,
                website: response.data.website,
                logo: response.data.logo,
            })
            console.log(this.state)
        }).catch(error => {
            // console.log(error);
        })
	}

	handleDeleteClick(e) {
		console.log(this.state)
	    e.preventDefault();	
		axios.delete(`/api/company/${this.state.id}`).then(response => {
            console.log(response.data)
        }).catch(error => {
            // console.log(error);
        })
	}

	handleEditClick(e) {
		console.log("something")
	    e.preventDefault();
	    let form = document.forms.namedItem("compForm");
		let formData = new FormData(form);
		axios.post(`/api/update/${this.state.id}`, formData, {headers:{'Content-Type': 'multipart/form-data' }}).then(response => {
			console.log(response.data)
            this.setState({
                id: response.data,
                redirect: true,
                name: response.data.name,
                email: response.data.email,
                website: response.data.website,
                logo: response.data.logo,
            })
            console.log(this.state)
        }).catch(error => {
            // console.log(error);
        })
	}

    render() {
    	// console.log(this.state);
    	// console.log(this.props.match.params)
    	let buttons;
    	let img = this.state.logo !== "" ?
	        (<img src={`storage/logos/${this.state.logo}`} alt="logo" width="100px" height="100px"/>)
	    : 
	      (null)
	    ;
	    if((typeof this.props.match.params.id) === "undefined" && (typeof this.props.match.params.company) === "undefined"){
			buttons = (<div><button type="submit" className="btn btn-success" onClick={this.handleClick}>Save</button></div>)
		} else if((typeof this.props.match.params.id) !== "undefined"){
			buttons = (<div><button type="submit" className="btn btn-success" onClick={this.handleClick}>Edit</button>
				<button type="submit" className="btn btn-danger" onClick={this.handleDeleteClick}>Delete</button></div>
			) 
		} else if((typeof this.props.match.params.company) !== "undefined"){
			buttons = (<div><button type="submit" className="btn btn-success" onClick={this.handleEditClick}>Save</button></div>)

		}
		    // let buttons = (typeof this.props.match.params.id) === "undefined" ?
		    // 	(<button type="submit" className="btn btn-default" onClick={this.handleClick}>Save</button>)
		    // :
		    // 	(<button type="submit" className="btn btn-default" onClick={this.handleClick}>Edit</button>
		    // 	<button type="submit" className="btn btn-default">Delete</button>)
		    // ;

        if(this.state.redirect){
			return <Redirect to={`/companies/show/${this.state.id}`} />;
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
										<input type="text" name="name" className="form-control" id="firstName" value={this.state.name} />
									</div>
									<div className="form-group">
										<label htmlFor="email">Email address:</label>
										<input type="email" name="email" className="form-control" id="email" value={this.state.email} />
									</div>
									<div className="form-group">
										<label htmlFor="company">Website:</label>
										<input type="text" name="website" className="form-control" id="website" value={this.state.website} />
									</div>
									
									<div className="form-group">
										<label htmlFor="logo">Company logo:</label>
										<input type="file" name="logo" className="form-control" id="logo" />
									</div>
									{img}
									{buttons}
									
									{/*<button type="submit" className="btn btn-default" onClick={this.handleClick}>Save</button>*/}
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