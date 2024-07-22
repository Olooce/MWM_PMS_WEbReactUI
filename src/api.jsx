import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 600000,
});

export default api;

export const validateCredentials = (username, password) => {
  return api.post('/systemusers/auth', {
    username: username,
    password: password
  });
};

export const getAllEmployees = (page = 0, size = 10) => api.get(`/employees?page=${page}&size=${size}`);
export const getAllNewEmployees = (page = 0, size = 10, startDate, endDate) => {
  let url = `/employees/new-by-department?page=${page}&size=${size}`;
  if (startDate) url += `&startDate=${startDate}`;
  if (endDate) url += `&endDate=${endDate}`;
  return api.get(url);
};
export const countActiveEmployees = (departmentId = 1) => api.get(`/employees/count-active/${departmentId}`);
export const searchEmployees = (searchTerm, page = 1, size = 10) => api.post(`/employees/search?searchTerm=${searchTerm}&page=${page}&size=${size}`);
export const addNewEmployee = async (employee) => {
  const response = await api.post('/employees/add-employee', employee);
  return response;
};
export const getEmployeeById = (employeeId) => api.get(`/employees/${employeeId}`);
export const updateEmployee = (employeeId, employeeDto) => api.put(`/employees/${employeeId}`, employeeDto);
export const deleteEmployee = (employeeId) => api.delete(`/employees/${employeeId}`);

export const getAllTaxes = (page = 1, size = 10) => api.get(`/taxes?page=${page}&size=${size}`)

export const getAllAllowances = (page = 1, size = 10) => api.get(`/allowances?page=${page}&size=${size}`)

export const getAllBankDetails = (page = 1, size = 10) => api.get(`/bankdetails?page=${page}&size=${size}`)

export const getAllBranches = (page = 1, size = 10) => api.get(`/branches?page=${page}&size=${size}`)

export const getAllContactInfo = (page = 1, size = 10) => api.get(`/contactinfo?page=${page}&size=${size}`)

export const getAllDeductions = (page = 1, size = 10) => api.get(`/deductions?page=${page}&size=${size}`)

export const getAllDepartments = (page = 1, size = 10) => api.get(`/departments?page=${page}&size=${size}`)

export const getAllSalaries = (page = 1, size = 10) => api.get(`/salaries?page=${page}&size=${size}`)
export const getEarningsAndDeductionsEmp = (employeeId = 1) => api.get(`/salaries/earnings-deductions?employeeId=${employeeId}`)
export const getAllowancesSalariesDept = (departmentId = 1) => api.get(`/salaries/allowances-net-salaries?departmentId=${departmentId}`)
export const getTotalSalary = api.get(`/salaries/total-net-salary`)
export const getPaymentHistory = (employeeId) => api.get(`/salaries/payment-history/?employeeId=${employeeId}`)

export const getAllUsers = (page = 1, size = 10) => api.get(`/systemusers?page=${page}&size=${size}`)