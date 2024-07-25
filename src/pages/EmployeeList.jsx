import React, { useEffect, useState, useCallback } from 'react';
import {
    getAllEmployees,
    searchEmployees,
    addNewEmployee,
    updateEmployee,
    deleteEmployee,
} from '../api';
import Dash from "../layout/Dash";
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import EmployeeTable from './EmployeeTable';
import LoadingAnimation from './LoadingAnimation';
import EmployeeDetailsModal from './modals/EmployeeDetailsModal';
import AddEmployeeModal from './modals/AddEmployeeModal';
import '../styles/pageStyling.css';
import '../styles/employeelistStyling.css';

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

    const handleGoToPage = () => {
        setPage(inputPage);
        setSize(inputSize);
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
            setNewEmployee({
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

    const renderContent = () => {
        if (error) return <div>Error: {error}</div>;
        if (loading) return <LoadingAnimation key="loading" />;
        if (employees.length === 0 && !loading) return <p>No employees found.</p>;
        return <EmployeeTable employees={employees} page={page} size={size} showEmployeeDetails={showEmployeeDetails} />;
    };

    return (
        <Dash>
            <div className="employees-list">
                <h2>Employees</h2>
                <div className="controls">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        handleAddEmployee={() => setIsModalOpen(true)}
                    />
                    <button className="add-employee-button" onClick={handleShowAllEmployees}>Show All</button>
                </div>

                {renderContent()}
                {(isSearching || showAllEmployees) && (
                    <Pagination
                        page={page}
                        setPage={setPage}
                        inputPage={inputPage}
                        setInputPage={setInputPage}
                        inputSize={inputSize}
                        setInputSize={setInputSize}
                        handleGoToPage={handleGoToPage}
                    />
                )}

                {selectedEmployee && (
                    <EmployeeDetailsModal
                        employee={selectedEmployee}
                        onClose={closeEmployeeDetails}
                        onSave={handleUpdateEmployee}
                        onDelete={handleDeleteEmployee}
                    />
                )}

                <AddEmployeeModal
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
