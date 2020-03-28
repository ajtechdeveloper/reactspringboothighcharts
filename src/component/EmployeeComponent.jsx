import React, { Component } from 'react';
import EmployeeDataService from '../service/EmployeeDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class EmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {

        console.log(this.state.id)

        if (this.state.id === -1) {
            return
        }

        EmployeeDataService.getEmployeeById(this.state.id)
            .then(response => this.setState({
                name: response.data.name,
                department: response.data.department,
                salary: response.data.salary,
                gender: response.data.gender
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.name) {
            errors.name = 'Enter a Name'
        }
        return errors

    }

    onSubmit(values) {

        let employee = {
            id: this.state.id,
            name: values.name,
            department: values.department,
            salary: values.salary,
            gender: values.gender
        }

        if (this.state.id === -1) {
            EmployeeDataService.createEmployee(employee)
                .then(() => this.props.history.push('/employee'))
        } else {
            EmployeeDataService.updateEmployee(employee)
                .then(() => this.props.history.push('/employee'))
        }

        console.log(values);
    }

    render() {

        let { gender, salary, department, name, id } = this.state

        return (
            <div>
                <h4>Employee</h4>
                <div className="container">
                <Formik
                    initialValues={{ id, name, department, salary, gender }}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="name" component="div"
                                        className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" type="text" name="id" disabled />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field className="form-control" type="text" name="name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Department</label>
                                    <Field className="form-control" type="text" name="department" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Salary</label>
                                    <Field className="form-control" type="text" name="salary" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Gender</label>
                                    <Field className="form-control" type="text" name="gender" />
                                </fieldset>
                                <button className="btn btn-info" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <br></br>
            <p align="center"><b>#SoftwareDeveloperCentral @AjTechDeveloper</b></p> 
            </div>
        )
    }

}

export default EmployeeComponent