import axios from 'axios'

const EMPLOYEE_API_URL = 'http://localhost:4000/employee'

class EmployeeDataService {

    getAllEmployees() {
        return axios.get(`${EMPLOYEE_API_URL}`);
    }

    deleteEmployee(id) {
        return axios.delete(`${EMPLOYEE_API_URL}/${id}`);
    }

    getEmployeeById(id) {
        return axios.get(`${EMPLOYEE_API_URL}/${id}`);
    }

    updateEmployee(employee) {
        return axios.put(`${EMPLOYEE_API_URL}`, employee);
    }

    createEmployee(employee) {
        return axios.post(`${EMPLOYEE_API_URL}`, employee);
    }
}

export default new EmployeeDataService()