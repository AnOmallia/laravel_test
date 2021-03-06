import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import { HashRouter , Link } from 'react-router-dom';
import EmployeesDelete from './EmployeesDelete';
import DeleteModal from './../DeleteModal';


export default class EmployeesResource extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            id: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            company: "",
            delId: "",
            companies: [],
            errors: [],
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.getCompaniesName = this.getCompaniesName.bind(this);

        if(typeof this.props.match.params.id !== "undefined"){
            this.getData(this.props.match.params.id);
        }

        if(typeof this.props.match.params.employee !== "undefined"){
            this.getData(this.props.match.params.employee);
            this.getCompanyData();
        }

        if(window.location.href.split("/").slice(-1).pop() == "create"){
            this.getCompanyData();
        }
    }

    getCompanyData(){
        axios.get('/api/companies').then(response => {
            this.setState( (state) => {
                state.companies = state.companies.concat(response.data.data);
                return state;
            });
        }).catch(error => {
            console.log(error);
        })
    }

    getData(id){
        axios.get(`/api/employees/${id}`).then(response => {
            this.setState({
                id: response.data.id,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                phone: response.data.phone,
                company: response.data.company.name,
            })
        }).catch(error => {
            console.log(error);
        })
    }

    handleClick(e) {
        e.preventDefault();
        let action = "";
        action = e.currentTarget.name == "create" ? '/api/employees' : `api/employees/${this.state.id}`
	    let form = document.forms.namedItem("employeeForm");
		let formData = new FormData(form);
        e.currentTarget.name == "edit" ? formData.append('_method', 'PUT') : null;
		
		axios.post(action, formData, {headers:{'Content-Type': 'multipart/form-data' }}).then(response => {
            this.setState({
                id: response.data,
                redirect: true,
            })
        }).catch(error => {
            this.setState({
                errors: error.response.data.errors,
            })
        })
	}

    handleValueChange(e) {
        this.setState({
            [e.currentTarget.name]: e.target.value,
            errors: [],
        })
    }

    getCompaniesName() {
        this.getCompanyData();
    }

    handleDeleteClick(e) {
        e.preventDefault();
        this.setState({
            delId: e.currentTarget.name,
        })
    }

    render() {
    	let buttons;
	    if((typeof this.props.match.params.id) === "undefined" && (typeof this.props.match.params.employee) === "undefined"){
			buttons = (<div><button type="submit" className="btn btn-success" onClick={this.handleClick} name="create"> Save  </button></div>)
		} else if((typeof this.props.match.params.id) !== "undefined"){
			buttons = (<div><Link className="btn btn-primary" to={`/employees/edit/${this.props.match.params.id}`} onClick={this.getCompaniesName}>Edit</Link>
				<button className="btn btn-danger" onClick={this.handleDeleteClick} data-toggle="modal" data-target="#myModal" name={this.props.match.params.id} >Delete</button></div>
			) 
		} else if((typeof this.props.match.params.employee) !== "undefined"){
			buttons = (<div><button type="submit" className="btn btn-success" name="edit" onClick={this.handleClick}>Save</button></div>)

		}

        let select;
        select = (window.location.href.split("/").slice(-1).pop() == 'create' || window.location.href.split("/").indexOf("edit") != -1)? (
                    <select name="company_id" id="company"  className="form-control" value={this.state.company_id} onChange={this.handleValueChange} >
                        {this.state.companies.map((company, ind) => (
                            <option  key={ind} value={company.id}>{ company.name }</option>
                            )
                        )}
                    </select>
                
            ) : (
                <input type="text" name="company" className="form-control" id="company" value={this.state.company} onChange={this.handleValueChange} />
            );

        if(this.state.redirect){

			return <Redirect to={"/employees"} />;
        }
        return (
            <div className="container">
			    <div className="row justify-content-center">
			        <div className="col-md-8">
			            <div className="card">
			                <div className="card-header">Add Employee</div>
			                <div className="card-body">
			                	<form action="#" name="employeeForm">
				                	<div className="form-group">
                                        {this.state.errors.first_name ? (<div style={{color:'red'}}>{this.state.errors.first_name} </div> ): null}
										<label htmlFor="firstName">First name:</label>
										<input type="text" name="first_name" className="form-control" id="firstName" value={this.state.first_name} onChange={this.handleValueChange}/>
									</div>
									<div className="form-group">
                                        {this.state.errors.last_name ? (<div style={{color:'red'}}>{this.state.errors.last_name} </div> ): null}
										<label htmlFor="lastName">Last name:</label>
										<input type="text" name="last_name" className="form-control" id="lastName" value={this.state.last_name} onChange={this.handleValueChange} />
									</div>
									<div className="form-group">
										<label htmlFor="email">Email address:</label>
										<input type="email" name="email" className="form-control" id="email" value={this.state.email} onChange={this.handleValueChange} />
									</div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone:</label>
                                        <input type="tel" name="phone" className="form-control" id="phone" value={this.state.phone} onChange={this.handleValueChange} />
                                    </div>
                                    <div className="form-group">
                                        {this.state.errors.company_id ? (<div style={{color:'red'}}>{this.state.errors.company_id} </div> ): null}
                                        <label htmlFor="company">Company name:</label>
                                        {select}
                                    </div>
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