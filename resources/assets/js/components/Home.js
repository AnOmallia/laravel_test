import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import Companies from './companies/Companies';

// var app = Component ({
// 	render() {
// 		return (
// 			<Router>
// 				<Route path={'/something'} Component={Companies}></Route>
// 			</Router>
// 		);
// 	}
// })

export default class Home extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     name: '',
        // }
    }

    componentWillMount(){
    	console.log('something');
        // let $this = this;

        // axios.get('/api/company').then(response => {
        //     this.setState({
        //         data: response.data
        //     })
        //     console.log(this.state.data[0])
        // }).catch(error => {
        //     console.log(error);
        // })
    }

    render() {
        return (
            <div className="container">
			    <div className="row justify-content-center">
			        <div className="col-md-8">
			            <div className="card">
			                <div className="card-header">Dashboard</div>

			                <div className="card-body">
			                        <div className="alert alert-success">
			                        </div>

			                    You are logged in!
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
        );
    }
}

// if (document.getElementById('home')) {
//     ReactDOM.render(<Home />, document.getElementById('home'));
// }


