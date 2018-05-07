import React, { Component } from 'react';
import CompaniesDelete from './companies/CompaniesDelete';
import { Router, Route, Switch, Redirect } from 'react-router';


export default class DeleteModal extends Component {
	constructor(props){
		super(props);
		this.state = {
            id: this.props.id,
        }
        this.handleModalDeleteClick = this.handleModalDeleteClick.bind(this);
    }

    handleModalDeleteClick(e) {
    	console.log(789)
        const sucsess = new CompaniesDelete(e.currentTarget.name);
        if(sucsess){
        	console.log(19)
        	if(document.getElementById(`a_${e.currentTarget.name}`)){
            	document.getElementById(`a_${e.currentTarget.name}`).style.display = "none";
        	}
        	return <Redirect to='/companies' />
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    	if(nextProps.id != this.props.id) {
    		this.setState({id: nextProps.id})
    	}
    }

	render() {
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
                            <button type="button" className="btn btn-default" data-dismiss="modal" id="modalDelete" name={this.state.id} onClick={this.handleModalDeleteClick} >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}