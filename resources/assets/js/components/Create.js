// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

// export default class Create extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             name: '',
//         }
//     }

//     componentWillMount(){
//         let $this = this;

//         axios.get('/api/company').then(response => {
//             this.setState({
//                 data: response.data
//             })
//             console.log(this.state.data[0])
//         }).catch(error => {
//             console.log(error);
//         })
//     }

//     render() {
//         return (
//             <div className="container">
// 			    <div className="row justify-content-center">
// 			        <div className="col-md-8">
// 			            <div className="card">
// 			                <div className="card-header">Add Companie</div>

// 			                <div className="card-body">
// 			                	<form action="/company" method="post">
// 				                	<div className="form-group">
// 										<label for="firstName">Company name:</label>
// 										<input type="text" name="name" className="form-control" id="firstName" />
// 									</div>
// 									<div className="form-group">
// 										<label for="email">Email address:</label>
// 										<input type="email" name="email" className="form-control" id="email" />
// 									</div>
// 									<div className="form-group">
// 										<label for="company">Website:</label>
// 										<input type="text" name="website" className="form-control" id="company" />
// 									</div>
// 									<div className="form-group">
// 										<label for="logo">Company logo:</label>
// 										<input type="file" name="logo" className="form-control" id="logo" />
// 									</div>
// 									<button type="submit" className="btn btn-default">Save</button>
// 								</form>
// 			                </div>
// 			            </div>
// 			        </div>
// 			    </div>
// 			</div>
//         );
//     }
// }

// if (document.getElementById('app')) {
//     ReactDOM.render(<Create />, document.getElementById('app'));
// }