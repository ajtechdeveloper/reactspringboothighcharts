import axios from 'axios'

const CHART_API_URL = 'http://localhost:4000/chart'

class ChartDataService {

    getGenderDiversity() {
    return axios.get(`${CHART_API_URL}/pie/genderDiversity`);
    }

    getDepartment() {
        return axios.get(`${CHART_API_URL}/pie/department`);
        }
}

export default new ChartDataService()