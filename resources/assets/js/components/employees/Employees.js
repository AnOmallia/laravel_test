import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter , Link } from 'react-router-dom';
import CompaniesDelete from './EmployeesDelete';
import DeleteModal from './../DeleteModal';

export default class Employees extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            delId: '',
            url: '/api/employees',
            pagination: [],
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentWillMount(){
        this.fetchEmployees()
    }

    fetchEmployees(){
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
        console.log(pagination)

        this.setState({
            pagination: pagination,
        })
    }

    loadNext() {
        this.setState({
            url: this.state.pagination.next_page_url,
        }, () => {
            this.fetchEmployees()
        })
    }

    loadPrev() {
        this.setState({
            url: this.state.pagination.prev_page_url,
        }, () => {
            this.fetchEmployees()
        })
    }

    handleDeleteClick(e) {
        this.setState({
            delId: e.currentTarget.name
        })
    }


    render() {
        let buttons
        if(this.state.pagination.last_page == 1){
            buttons = (<div><button className="btn btn-primary" disabled onClick={this.loadPrev.bind(this)}> Prev </button>
                <button className="btn btn-primary" disabled onClick={this.loadNext.bind(this)}> Next </button></div>)
        } else if(this.state.pagination.current_page == 1){
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
                <Link className="btn btn-primary" to="/employees/create" ><i className="fa fa-plus" aria-hidden="true"></i> Add Employee </Link>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Company</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((employee, i) => (
                            <tr key={employee.id} id={`a_${employee.id}`}>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.company.name}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link className="btn btn-info" to={`/employees/show/${employee.id}`} ><i className="fa fa-eye" aria-hidden="true"></i></Link>
                                        <Link className="btn btn-primary" to={`/employees/edit/${employee.id}`} ><i className="fa fa-edit" aria-hidden="true"></i></Link>
                                        <button className="btn btn-danger" data-toggle="modal" name={employee.id} data-target="#myModal" onClick={this.handleDeleteClick} ><i className="fa fa-trash" aria-hidden="true"></i></button>
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
