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
            delId: ''
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentWillMount(){
        let $this = this;

        axios.get('/api/company').then(response => {
            this.setState({
                data: response.data
            })
            //console.log(this.state.data[0])
        }).catch(error => {
            // console.log(error);
        })
    }

    handleDeleteClick(e) {
        this.setState({
                delId: e.currentTarget.name
            })
        //document.getElementById('modalDelete').setAttribute("name", e.currentTarget.name);
    }

    // handleModalDeleteClick(e) {
    //     const sucsess = new CompaniesDelete(e.currentTarget.name);
    //     console.log(sucsess)
    //     if(sucsess){
    //         document.getElementById(`a_${e.currentTarget.name}`).style.display = "none";
    //     }
    // }

    render() {
        return (
            <div className="container">

                {/*<a type="button" className="btn btn-info" link="companies/create"><i className="fa fa-plus" aria-hidden="true"></i> Add Company</a>*/}
                <Link className="btn btn-primary" to="/companies/create" ><i className="fa fa-plus" aria-hidden="true"></i> Add Company </Link>
                {/*<Route path="/:id" component={Child} />*/}
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
