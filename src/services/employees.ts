import axios from "axios";

const server: string = "http://localhost:8000"

class EmployeeDataService {
    getAll(token: string) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
        return axios.get(`${server}/api/employees/`)
    }

    getEmployee(token: string, id: string | undefined) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
        return axios.get(`${server}/api/employee/${id}`)
    }
    
    createEmployee(token: string, data: any) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
        axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        return axios.post(`${server}/api/employees/create/`, data)
    }
    
    updateEmployee(token: string, employee_id: string | undefined, data: any) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
        axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        return axios.post(`${server}/api/employee/${employee_id}`, data)
    }
    
    deleteEmployee(token: string, employee_id: string) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
        return axios.delete(`${server}/api/employee/delete/${employee_id}`)
    }

    download() {
        return axios.get(`${server}/api/download/`)
    }
    
    login(data: any) {
        return axios.post(`${server}/api/login/`, data)
    }
    
    signup(data: any) {
        return axios.post(`${server}/api/signup/`, data)
    }
}

export default new EmployeeDataService()