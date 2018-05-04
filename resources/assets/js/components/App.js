import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { HashRouter , Link } from 'react-router-dom';
import Home from './Home';
import Companies from './companies/Companies';
import CompaniesCreate from './companies/CompaniesCreate';

export default class App extends Component {
    render() {
        return (
            <div>
                {/*<HashRouter basename="/companies">
                    <Route exact path='/' component={Home} />
                </HashRouter>*/}
                <HashRouter>
                    <Switch>
                    <Route exact path='/' component={Home} />
                        <Route exact path='/companies' component={Companies} />
                        <Route exact path='/companies/create' component={CompaniesCreate} />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

