import React, { Component } from 'react';


export default class EmployeesDelete extends Component {
	constructor(props){
		super(props);
		this.deleteCompany(props);
    }

    deleteCompany(id){
		axios.delete(`/api/employee/${id}`).then(response => {
        }).catch(error => {
            console.log(error);
        })
    }
}