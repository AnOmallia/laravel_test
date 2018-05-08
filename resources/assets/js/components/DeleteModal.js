import React, { Component } from 'react';
import CompaniesDelete from './companies/CompaniesDelete';
import EmployeesDelete from './employees/EmployeesDelete';
import { Router, Route, Switch, Redirect } from 'react-router';


export default class DeleteModal extends Component {
	constructor(props){
		super(props);
		this.state = {
            id: this.props.id,
            redirect: false,
            page: ","
        }
        this.handleModalDeleteClick = this.handleModalDeleteClick.bind(this);
    }

    handleModalDeleteClick(e) {
        let sucsess = "";
        let page = "";
        if (window.location.href.split('/').indexOf("employees") != -1) {
            sucsess = new EmployeesDelete(e.currentTarget.name);
            page = "employees";

        } else if (window.location.href.split('/').indexOf("companies") != -1){
            sucsess = new CompaniesDelete(e.currentTarget.name);
            page = "companies";
        }
        if(sucsess){
        	if(document.getElementById(`a_${e.currentTarget.name}`)){
            	document.getElementById(`a_${e.currentTarget.name}`).style.display = "none";
        	}
        	this.setState({
                redirect: true,
                page: page,
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    	if(nextProps.id != this.props.id) {
    		this.setState({id: nextProps.id})
    	}
    }

	render() {
        if(this.state.redirect){
            return <Redirect to={`/${this.state.page}`} />;
        }
        return (
        	<div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>are you sure you want to delete company?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" id="modalDelete" name={this.state.id} onClick={this.handleModalDeleteClick} >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}