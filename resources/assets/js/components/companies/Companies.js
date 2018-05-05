import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter , Link } from 'react-router-dom';

export default class Companies extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
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

    render() {
        return (
            <div className="container">
                {/*<a type="button" className="btn btn-info" link="companies/create"><i className="fa fa-plus" aria-hidden="true"></i> Add Company</a>*/}
                <Link to="/companies/create/2" >Add Company</Link>
                {/*<Route path="/:id" component={Child} />*/}
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped">
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
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.email}</td>
                                <td>{company.website}</td>
                                <td>{company.email}</td>
                                <td>
                                    <div className="btn-group">
                                        <a type="button" className="btn btn-info" href="company"><i className="fa fa-eye" aria-hidden="true"></i></a>
                                        <a type="button" className="btn btn-primary" href="companyidedit"><i className="fa fa-edit" aria-hidden="true"></i></a>
                                        
                                            <button type="submit" className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                    </div>
                                </td>
                            </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
