// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import environment from './passport/Environment';

// export default class Welcome extends Component {
//     constructor(props){
//         console.log(789)
//         super(props);
//         this.state = {
//             data: []
//         }
//     }

//     componentWillMount(){
//         let $this = this; 

//         axios.get('/api/welcome').then(response => {
//             this.setState({
//                 data: response.data
//             })
//             console.log(this.state.data[0], 1)
//         }).catch(error => {
//             console.log(error, 2);
//         })
//         let data = {
//             grand_type: 'password',
//             client_id: environment.id,
//             client_secret: environment.secret,
//             username: 'admin@admin.com',
//             password: 'password',
//             scope: '*'
//         }
//         console.log(environment)
//         axios.post('/oauth/token', data, {
// 		    headers: {
// 		    	'Accept': 'application/json',
//         		'Content-Type': 'application/json',
//         	}
// 		})
// 	    .then(response => {
// 	        console.log(response.data);
// 	    })
// 	    .catch (error => {
// 	    	console.log(error, 2);
// 	        // List errors on response...
// 	    });



// 	    let x = {
//             grand_type: 'password',
//             client_id: 'id',
//             client_secret: 'secret'
//         }
//         let url = '/oauth/token'
//     }

//     render() {
//         return (
//             <div className="flex-center position-ref full-height">
//             @if (Route::has('login'))
//                 <div className="top-right links">
//                     @auth
//                         <a href="{{ url('/home') }}">Home</a>
//                     @else
//                         <a href="{{ route('login') }}">Login</a>
//                     @endauth
//                 </div>
//             @endif

//             <div className="content">
//                 <div className="title m-b-md">
//                     Laravel
//                 </div>

//                 <div className="links">
//                 	<h1> Welcom To Companies and Employees Site</h1>
//                 </div>
//             </div>
//         </div>
//         );
//     }
// }

// if (document.getElementById('welcome')) {
//     ReactDOM.render(<Welcome />, document.getElementById('welcome'));
// }