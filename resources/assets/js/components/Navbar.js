import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router'
import Companies from './Companies';



export default class Navbar extends Component {
    // constructor(props){
    //     super(props);
    //     // this.state = {
    //     //     name: '',
    //     // }
    // }

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
        	<div>
	            <a className="btn btn-primary" href="/companies">
	                Companies
	            </a>
	            <a className="btn btn-primary" href="/employee">
	                Employees
	            </a>
            </div>
        );
    }
}

// if (document.getElementById('navbtn')) {
//     ReactDOM.render(<Navbar />, document.getElementById('navbtn'));
// }


