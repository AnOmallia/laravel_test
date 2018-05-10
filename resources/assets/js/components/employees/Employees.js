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
            delId: ''
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentWillMount(){
        let $this = this;

        axios.get('api/employees').then(response => {
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
                                <td>{employee.companies.name}</td>
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
                </div>
                <DeleteModal id={this.state.delId} />
                
            </div>
        );
    }
}
