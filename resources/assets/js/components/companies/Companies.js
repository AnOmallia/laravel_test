import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter , Link } from 'react-router-dom';
import CompaniesDelete from './CompaniesDelete';
import DeleteModal from './../DeleteModal';

export default class Companies extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            delId: '',
            auth: localStorage.getItem('token'),
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentWillMount(){
        let $this = this;
        console.log(789, this.state.auth)
        //axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.data.token;
        //axios.get('/api/company', '', {headers:{'Authorization': `Bearer ${this.state.auth}`}}).then(response => {
        axios.get('/api/company').then(response => {
            this.setState({
                data: response.data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    handleDeleteClick(e) {
        this.setState({
                delId: e.currentTarget.name
            })
    }


    render() {
        return (
            <div className="container">
                <Link className="btn btn-primary" to="/companies/create" ><i className="fa fa-plus" aria-hidden="true"></i> Add Company </Link>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Website</th>
                                <th>Logo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((company, i) => (
                            <tr key={company.id} id={`a_${company.id}`}>
                                <td>{company.name}</td>
                                <td>{company.email}</td>
                                <td>{company.website}</td>
                                <td>{company.logo}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link className="btn btn-info" to={`/companies/show/${company.id}`} ><i className="fa fa-eye" aria-hidden="true"></i></Link>
                                        <Link className="btn btn-primary" to={`/companies/edit/${company.id}`} ><i className="fa fa-edit" aria-hidden="true"></i></Link>
                                        <button className="btn btn-danger" data-toggle="modal" name={company.id} data-target="#myModal" onClick={this.handleDeleteClick} ><i className="fa fa-trash" aria-hidden="true"></i></button>
                                    </div>
                                </td>
                            </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
                <DeleteModal id={this.state.delId} />
                
            </div>
        );
    }
}
