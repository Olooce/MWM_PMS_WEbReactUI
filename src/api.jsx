import axios from 'axios';

const api = axios.create({
  baseURL: 'http://delicate-clearly-roughy.ngrok-free.app',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 600000,
});

export default api;

// Add a request interceptor to include a JWT token in the headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  console.log(token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);



// Authentication
export const validateCredentials = async (username, password) => {
  const response = await fetch('http://localhost:8080/systemusers/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 200) {
    const token = await response.text();
    localStorage.setItem('jwt', token);
    return response;
  } else {
    throw new Error('Invalid credentials');
  }
};



// Employee Management
export const getAllEmployees = (page = 0, size = 10) =>
  api.get(`/employees?page=${page}&size=${size}`);

export const getAllNewEmployees = (page = 0, size = 10, startDate, endDate) => {
  let url = `/employees/new-by-department?page=${page}&size=${size}`;
  if (startDate) url += `&startDate=${startDate}`;
  if (endDate) url += `&endDate=${endDate}`;
  return api.get(url);
};

export const countActiveEmployees = (departmentId = 1) =>
  api.get(`/employees/count-active/${departmentId}`);

export const searchEmployees = (searchTerm, page = 1, size = 10) =>
  api.post(`/employees/search?searchTerm=${searchTerm}&page=${page}&size=${size}`);

export const addNewEmployee = async (employee) => {
  const response = await api.post('/employees/add-employee', employee);
  return response;
};

export const getEmployeeById = (employeeId) =>
  api.get(`/employees/${employeeId}`);

export const updateEmployee = (employeeId, employeeDto) =>
  api.put(`/employees/${employeeId}`, employeeDto);

export const deleteEmployee = (employeeId) =>
  api.delete(`/employees/${employeeId}`);

// Other Managements
export const getAllTaxes = (page = 1, size = 10) =>
  api.get(`/taxes?page=${page}&size=${size}`);

export const getAllAllowances = (page = 1, size = 10) =>
  api.get(`/allowances?page=${page}&size=${size}`);

export const getAllBankDetails = (page = 1, size = 10) =>
  api.get(`/bankdetails?page=${page}&size=${size}`);

export const getAllBranches = (page = 1, size = 10) =>
  api.get(`/branches?page=${page}&size=${size}`);

export const getAllContactInfo = (page = 1, size = 10) =>
  api.get(`/contactinfo?page=${page}&size=${size}`);

export const getAllDeductions = (page = 1, size = 10) =>
  api.get(`/deductions?page=${page}&size=${size}`);

export const getAllDepartments = (page = 1, size = 10) =>
  api.get(`/departments?page=${page}&size=${size}`);

export const getAllSalaries = (page = 1, size = 10) =>
  api.get(`/salaries?page=${page}&size=${size}`);

export const getEarningsAndDeductionsEmp = (employeeId = 1) =>
  api.get(`/salaries/earnings-deductions?employeeId=${employeeId}`);

export const getAllowancesSalariesDept = (departmentId = 1) =>
  api.get(`/salaries/allowances-net-salaries?departmentId=${departmentId}`);

export const getTotalSalary = () =>
  api.get(`/salaries/total-net-salary`);

export const getPaymentHistory = (employeeId) =>
  api.get(`/salaries/payment-history/?employeeId=${employeeId}`);

// System Users
export const getAllUsers = (page = 1, size = 10) =>
  api.get(`/systemusers?page=${page}&size=${size}`);

// Export and Download
export const exportTable = (tableName) =>
  api.post(`/api/export/${tableName}`);

export const exportSearch = (tableName, searchTerm) =>
  api.post(`/api/exportSearch/${tableName}`, null, { params: { searchTerm } });

export const downloadExport = (fileId) =>
  api.get(`/api/download/${fileId}`, {
    responseType: 'blob'
  });

export const getExports = (page = 1, size = 10) =>
  api.get(`api/listExports?page=${page}&size=${size}`);
