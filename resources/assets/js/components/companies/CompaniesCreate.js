import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import { HashRouter , Link } from 'react-router-dom';
import CompaniesDelete from './CompaniesDelete';
import DeleteModal from './../DeleteModal';
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
            delId:"",
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        if(typeof this.props.match.params.id !== "undefined"){
            this.getData(this.props.match.params.id);
        }
        if(typeof this.props.match.params.company !== "undefined"){
            this.getData(this.props.match.params.company);
        }
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
        console.log(this.state)
        }).catch(error => {
            console.log(error);
        })
    }

    handleClick(e) {
        e.preventDefault();
        let action = "";
        action = e.currentTarget.name == "create" ? '/api/company' : `/api/update/${this.state.id}`
	    let form = document.forms.namedItem("compForm");
		let formData = new FormData(form);
		
		axios.post(action, formData, {headers:{'Content-Type': 'multipart/form-data' }}).then(response => {
            console.log()
            this.setState({
                id: response.data,
                redirect: true,
                // name: response.data.name,
                // email: response.data.email,
                // website: response.data.website,
                // logo: response.data.logo,
            })
        console.log(this.state)
        }).catch(error => {
            console.log(error);
        })
	}


    // handleModalDeleteClick(e) {
    //     const sucsess = new CompaniesDelete(e.currentTarget.name);
    //     if(sucsess){
    //         document.getElementById(`a_${e.currentTarget.name}`).style.display = "none";
    //     }
    // }

    handleValueChange(e) {
        let key = e.currentTarget.name;
        this.setState({
            [key]: e.target.value,
        })
    }

	handleEditClick(e) {
	    e.preventDefault();
	    let form = document.forms.namedItem("compForm");
		let formData = new FormData(form);
		axios.post(`/api/update/${this.state.id}`, formData, {headers:{'Content-Type': 'multipart/form-data' }}).then(response => {
            this.setState({
                id: response.data,
                //redirect: true,
                name: response.data.name,
                email: response.data.email,
                website: response.data.website,
                logo: response.data.logo,
            })
        }).catch(error => {
            console.log(error);
        })
	}

    handleDeleteClick(e) {
        this.setState({
                delId: e.currentTarget.name
            })
        //document.getElementById('modalDelete').setAttribute("name", e.currentTarget.name);
    }

    render() {
    	let buttons;
    	let img = this.state.logo !== "" ?
	        (<img src={`storage/logos/${this.state.logo}`} alt="logo" width="100px" height="100px"/>)
	    : 
	      (null)
	    ;
	    if((typeof this.props.match.params.id) === "undefined" && (typeof this.props.match.params.company) === "undefined"){
			buttons = (<div><button type="submit" className="btn btn-success" onClick={this.handleClick} name="create"> Save  </button></div>)
		} else if((typeof this.props.match.params.id) !== "undefined"){
			buttons = (<div><Link className="btn btn-primary" to={`/companies/edit/${this.props.match.params.id}`} >Edit</Link>
				<button className="btn btn-danger" onClick={this.handleDeleteClick} data-toggle="modal" data-target="#myModal" name={this.props.match.params.id} >Delete</button></div>
			) 
		} else if((typeof this.props.match.params.company) !== "undefined"){
			buttons = (<div><button type="submit" className="btn btn-success" name="edit" onClick={this.handleClick}>Save</button></div>)

		}

        if(this.state.redirect){

			return <Redirect to={"/companies"} />;
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
										<input type="text" name="name" className="form-control" id="firstName" value={this.state.name} onChange={this.handleValueChange}/>
									</div>
									<div className="form-group">
										<label htmlFor="email">Email address:</label>
										<input type="email" name="email" className="form-control" id="email" value={this.state.email} onChange={this.handleValueChange} />
									</div>
									<div className="form-group">
										<label htmlFor="company">Website:</label>
										<input type="text" name="website" className="form-control" id="website" value={this.state.website} onChange={this.handleValueChange} />
									</div>
									
									<div className="form-group">
										<label htmlFor="logo">Company logo:</label>
										<input type="file" name="logo" className="form-control" id="logo" />
									</div>
									{img}
									{buttons}
								</form>
			                </div>
			            </div>
			        </div>
			    </div>
                <DeleteModal id={this.state.delId} />
			</div>
        );
    }
}