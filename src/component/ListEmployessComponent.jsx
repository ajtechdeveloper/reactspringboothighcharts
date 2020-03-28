import React, { Component } from 'react';
import EmployeeDataService from '../service/EmployeeDataService'
import ChartDataService from '../service/ChartDataService';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class ListEmployeesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            genderData: [],
            departmentData: [],
            message: null
        }
        this.refreshEmployees = this.refreshEmployees.bind(this)
        this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this)
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this)
        this.deleteEmployeeClicked = this.deleteEmployeeClicked.bind(this)
        this.getGenderDiversity = this.getGenderDiversity.bind(this)
        this.getDepartment = this.getDepartment.bind(this)
    }

    componentDidMount() {
        this.refreshEmployees();
        this.getGenderDiversity();
        this.getDepartment();
    }

    refreshEmployees() {
        EmployeeDataService.getAllEmployees()
            .then(
                response => {
                    console.log(response);
                    this.setState({ employees: response.data })
                }
            )
    }

    getGenderDiversity() {
        ChartDataService.getGenderDiversity()
            .then(
                response => {
                    console.log(response);
                    this.setState({ genderData: response.data })
                }
            )
    }

    getDepartment() {
        ChartDataService.getDepartment()
            .then(
                response => {
                    console.log(response);
                    this.setState({ departmentData: response.data })
                }
            )
    }

    deleteEmployeeClicked(id) {
        EmployeeDataService.deleteEmployee(id)
            .then(
                response => {
                    this.setState({ message: `Delete of Employee with ID: ${id} is successful` })
                    this.refreshEmployees()
                    this.getGenderDiversity()
                    this.getDepartment()
                }
            )
    
    }

    updateEmployeeClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/employee/${id}`)
    }

    addEmployeeClicked() {
        this.props.history.push(`/employee/-1`)
    }

    render() {
        const options = {
            chart: {
              type: "pie"
            },
            title: {
              text: "Gender Diversity"
            },
            series: [
              {
                data: this.state.genderData
              }
            ]
          };

          const options1 = {
            chart: {
              type: "pie"
            },
            title: {
              text: "Department"
            },
            series: [
              {
                data: this.state.departmentData
              }
            ]
          };

          const containerStyle = {
            display: "flex",
            width: "100%",
            height: "350px"
          };

          const chartStyle = {
            width: "50%"
          };
        return (
            <div className="container">
                <h4>All Employees</h4>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Gender</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.department}</td>
                                            <td>{employee.salary}</td>
                                            <td>{employee.gender}</td>
                                            <td><button className="btn btn-primary" onClick={() => this.updateEmployeeClicked(employee.id)}>Update</button></td>
                                            <td><button className="btn btn-danger" onClick={() => this.deleteEmployeeClicked(employee.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                <button className="btn btn-info" onClick={this.addEmployeeClicked}>Add</button>
                </div>
                <div className="container1" style = {containerStyle}>
                <div className="chart" style={chartStyle}>
                <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
                <div className="chart1" style={chartStyle}>
                <HighchartsReact highcharts={Highcharts} options={options1} />
                </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div>
                <p align="center"><b>#SoftwareDeveloperCentral @AjTechDeveloper</b></p> 
                </div>
            </div>
        )
    }
}

export default ListEmployeesComponent