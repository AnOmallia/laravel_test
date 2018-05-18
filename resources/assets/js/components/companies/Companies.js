import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter , Link } from 'react-router-dom';
import CompaniesDelete from './CompaniesDelete';
import DeleteModal from './../DeleteModal';

export default class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            delId: '',
            auth: localStorage.getItem('token'),
            url: '/api/companies',
            pagination: [],
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentWillMount() {
        this.fetchCompanies()
    }

    fetchCompanies() {
        axios.get(this.state.url).then(response => {
            this.setState({
                data: response.data.data
            })
            this.makePagination(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    makePagination(data) {
        let pagination = {
            current_page: data.current_page,
            last_page: data.last_page,
            next_page_url: data.next_page_url,
            prev_page_url: data.prev_page_url,
        }

        this.setState({
            pagination: pagination,
        })
    }

    loadNext() {
        this.setState({
            url: this.state.pagination.next_page_url,
        }, () => {
            this.fetchCompanies()
        })
    }

    loadPrev() {
        this.setState({
            url: this.state.pagination.prev_page_url,
        }, () => {
            this.fetchCompanies()
        })
    }

    handleDeleteClick(e) {
        this.setState({
                delId: e.currentTarget.name
            })
    }


    render() {
        let buttons
        if(this.state.pagination.current_page == 1){
            buttons = (<div><button className="btn btn-primary" disabled onClick={this.loadPrev.bind(this)}> Prev </button>
                <button className="btn btn-primary" onClick={this.loadNext.bind(this)}> Next </button></div>)
        } else if(this.state.pagination.current_page == this.state.pagination.last_page){
            buttons = (<div><button className="btn btn-primary" onClick={this.loadPrev.bind(this)}> Prev </button>
                <button className="btn btn-primary" disabled onClick={this.loadNext.bind(this)}> Next </button></div>)
        } else {
             buttons = (<div><button className="btn btn-primary" onClick={this.loadPrev.bind(this)}> Prev </button>
                <button className="btn btn-primary" onClick={this.loadNext.bind(this)}> Next </button></div>)
        }
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
                      {buttons}
                </div>
                <DeleteModal id={this.state.delId} />
                
            </div>
        );
    }
}
