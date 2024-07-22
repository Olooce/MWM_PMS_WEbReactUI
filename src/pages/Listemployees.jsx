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
import EmployeeDetails from './modals/EmployeeDetails';
import AddEmployee from './modals/AddEmployee';
import '../styles/pageStyling.css'
import '../styles/employeelistStyling.css'

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
    const [isSearching, setIsSearching] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        departmentId: '',
        employmentType: '',
        dob: '',
        gender: '',
        status: '',
        statusDescription: '',
        employmentDate: '',
        terminationDate: ''
    });
    const [showAllEmployees, setShowAllEmployees] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true);
            let response;
            if (isSearching) {
                response = await searchEmployees(searchTerm, page, size);
            } else {
                response = await getAllEmployees(page, size);
            }
            const data = response.data;
            setEmployees(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [isSearching, searchTerm, page, size]);

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
        setPage(1);
    };

    const handleSearch = () => {
        setIsSearching(true);
        setPage(1);
        setShowAllEmployees(false);
        fetchEmployees();
    };

    const handleShowAllEmployees = () => {
        setIsSearching(false);
        setSearchTerm('');
        setPage(1);
        setShowAllEmployees(true);
        fetchEmployees();
    };

    const handleNewEmployeeChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleAddEmployee = async () => {
        try {
            setLoading(true);
            await addNewEmployee(newEmployee);
            setNewEmployee({ name: '', departmentId: '', employmentType: '', dob: '', gender: '', status: '', statusDescription: '' });
            fetchEmployees();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
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
                        <th>#</th>
                        <th>Name</th>
                        <th>Department ID</th>
                        <th>Employment Type</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.employeeId}>
                            <td>
                                <button className="cell-btn" onClick={() => showEmployeeDetails(employee)}>
                                    {(page - 1) * size + index + 1}
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

    const renderPagination = () => {
        if (isSearching || showAllEmployees) {
            return (
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
        }


    };

    const renderContent = () => {
        if (error) return <div>Error: {error}</div>;
        if (loading) return <LoadingAnimation key="loading" />;
        if (employees.length === 0 && !loading) return <p>No employees found.</p>;
        if (showAllEmployees || isSearching) return <div>{renderTable()}</div>;
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
                    <button className="add-employee-button" onClick={() => setIsModalOpen(true)}>Add Employee</button>
                    <button className="show-all-button" onClick={handleShowAllEmployees}>All Employees</button>
                </div>

                {renderContent()}
                {renderPagination()}
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
                <AddEmployee
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddEmployee}
                    newEmployee={newEmployee}
                    handleNewEmployeeChange={handleNewEmployeeChange}
                />
            </div>
        </Dash>
    );
};

export default ListEmployees;
