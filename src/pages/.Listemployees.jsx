import React, { useEffect, useState, useCallback } from 'react';
import {
    getAllEmployees,
    searchEmployees,
    addNewEmployee,
    updateEmployee,
    deleteEmployee,
} from '../api';
import Dash from "../layout/Dash";
import HandleNextPage from '../components/HandleNextPage';
import HandlePrevPage from '../components/HandlePrevPage';
import { motion, AnimatePresence } from 'framer-motion';
import EmployeeDetails from './EmployeeDetails';

const LoadingAnimation = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="loading-animation"
    >
        <div className="spinner"></div>
    </motion.div>
);

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [inputPage, setInputPage] = useState(1);
    const [inputSize, setInputSize] = useState(10);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [newEmployee, setNewEmployee] = useState({ name: '', departmentId: '', employmentType: '' });
    const [showAllEmployees, setShowAllEmployees] = useState(false);

    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllEmployees(page, size);
            const data = response.data;
            setEmployees(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [page, size]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handlePageChange = (e) => {
        setInputPage(Number(e.target.value));
    };

    const handleSizeChange = (e) => {
        setInputSize(Number(e.target.value));
    };

    const handleGoToPage = () => {
        setPage(inputPage);
        setSize(inputSize);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await searchEmployees(searchTerm);
            const data = response.data;
            setEmployees(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNewEmployeeChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleAddEmployee = async () => {
        try {
            setLoading(true);
            await addNewEmployee(newEmployee);
            fetchEmployees();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEmployee = async (employeeId) => {
        try {
            setLoading(true);
            await updateEmployee(employeeId, selectedEmployee);
            fetchEmployees();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            setLoading(true);
            await deleteEmployee(employeeId);
            fetchEmployees();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const showEmployeeDetails = (employee) => {
        setSelectedEmployee(employee);
    };

    const closeEmployeeDetails = () => {
        setSelectedEmployee(null);
    };

    const renderTable = () => (
        <div className="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department ID</th>
                        <th>Employment Type</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>
                                <button onClick={() => showEmployeeDetails(employee)}>
                                    {employee.employeeId}
                                </button>
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.departmentId}</td>
                            <td>{employee.employmentType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderPagination = () => (
        <div className="pagination">
            <HandlePrevPage page={page} setPage={setPage} setLoading={setLoading} />
            <span className="page-info">Page {page}</span>
            <HandleNextPage page={page} setPage={setPage} setLoading={setLoading} />
            <div className="page-controls">
                <input
                    type="number"
                    value={inputPage}
                    onChange={handlePageChange}
                    placeholder="Page number"
                    className="page-input"
                />
                <input
                    type="number"
                    value={inputSize}
                    onChange={handleSizeChange}
                    placeholder="Page size"
                    className="size-input"
                />
                <button onClick={handleGoToPage} className="go-button">Go</button>
            </div>
        </div>
    );

    const renderContent = () => {
        if (error) return <div>Error: {error}</div>;
        if (loading) return <LoadingAnimation key="loading" />;
        if (employees.length === 0 && !loading) return <p>No employees found.</p>;

        return (
            // <motion.div
            //     key="content"
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     exit={{ opacity: 0 }}
            // >
            //     {renderTable()}
            // </motion.div>
            <div>
            {renderTable()}
            </div>
        );
    };

    return (
        <Dash>
            <div className="employees-list">
                <h2>Employees</h2>
                <div className="controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search employees..."
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className="new-employee-form">
                        <input
                            type="text"
                            name="name"
                            value={newEmployee.name}
                            onChange={handleNewEmployeeChange}
                            placeholder="Name"
                        />
                        <input
                            type="number"
                            name="departmentId"
                            value={newEmployee.departmentId}
                            onChange={handleNewEmployeeChange}
                            placeholder="Department ID"
                        />
                        <input
                            type="text"
                            name="dob"
                            value={newEmployee.employmentType}
                            onChange={handleNewEmployeeChange}
                            placeholder="DOB"
                        />
                        <input
                            type="text"
                            name="employmentType"
                            value={newEmployee.employmentType}
                            onChange={handleNewEmployeeChange}
                            placeholder="Employment Type"
                        />
                        <input
                            type="text"
                            name="gender"
                            value={newEmployee.employmentType}
                            onChange={handleNewEmployeeChange}
                            placeholder="Gender"
                        />
                        <input
                            type="text"
                            name="status"
                            value={newEmployee.employmentType}
                            onChange={handleNewEmployeeChange}
                            placeholder="Status"
                        />
                        <input
                            type="text"
                            name="statusDescription"
                            value={newEmployee.employmentType}
                            onChange={handleNewEmployeeChange}
                            placeholder="Status Description"
                        />
                        
                        <button onClick={handleAddEmployee}>Add Employee</button>
                    </div>
                    <button onClick={() => setShowAllEmployees(true)}>All Employees</button>
                </div>
                {showAllEmployees && (
                    <>
                        {renderContent()}
                        {renderPagination()}
                    </>
                )}
                {selectedEmployee && (
                    <div className="employee-details-overlay">
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="employee-details-container"
                            >
                                <EmployeeDetails
                                    employee={selectedEmployee}
                                    onClose={closeEmployeeDetails}
                                    onSave={handleUpdateEmployee}
                                    onDelete={handleDeleteEmployee}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </Dash>
    );
};

export default ListEmployees;
