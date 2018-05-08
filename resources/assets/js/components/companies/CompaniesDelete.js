import React, { Component } from 'react';


export default class CompaniesDelete extends Component {
	constructor(props){
		super(props);
		this.deleteCompany(props);
    }

    deleteCompany(id){
		axios.delete(`/api/company/${id}`).then(response => {
        }).catch(error => {
            console.log(error);
        })
    }
}