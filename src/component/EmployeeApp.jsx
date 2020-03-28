import React, { Component } from 'react';
import ListEmployeesComponent from './ListEmployessComponent';
import EmployeeComponent from './EmployeeComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class EmployeeApp extends Component {
    render() {
        return (<Router>
            <>
                <h2>Employee Application</h2>
                <Switch>
                    <Route path="/" exact component={ListEmployeesComponent} />
                    <Route path="/employee" exact component={ListEmployeesComponent} />
                    <Route path="/employee/:id" component={EmployeeComponent} />
                </Switch>
            </>
        </Router>
        )
    }
}

export default EmployeeApp