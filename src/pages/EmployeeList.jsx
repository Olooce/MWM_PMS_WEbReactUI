import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dash from "../layout/Dash";
import useEmployees from '../hooks/useEmployees';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import EmployeeTable from '../components/tables/EmployeeTable';
import LoadingAnimation from '../components/LoadingAnimation';
import AddEmployeeModal from '../components/modals/AddEmployeeModal';
import EmployeeDetailsModal from '../components/modals/EmployeeDetailsModal';
import '../styles/pageStyling.css';

const ListEmployees = () => {
    const {
        employees,
        loading,
        error,
        pagination,
        isSearching,
        searchTerm,
        selectedEmployee,
        newEmployee,
        setIsSearching,
        setSearchTerm,
        setSelectedEmployee,
        setNewEmployee,
        fetchEmployees,
        handleAddEmployee,
        handleShowEmployeeDetails,
        handleUpdateEmployee,
        handleDeleteEmployee,
        handleExportSearch,
        handleExportTable,
    } = useEmployees();

    const [showAllEmployees, setShowAllEmployees] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowAllEmployees = () => {
        setIsSearching(false);
        setShowAllEmployees(true);
        setSearchTerm('');
        pagination.setPage(1);
        fetchEmployees();
    };

    const renderContent = () => {
        if (error) return <div>Error: {error}</div>;
        if (loading) return <LoadingAnimation key="loading" />;
        if (employees.length === 0 && !loading) return <p>No employees found.</p>;

        return (
            <>
                <EmployeeTable
                    employees={employees}
                    page={pagination.page}
                    size={pagination.size}
                    setSelectedEmployee={setSelectedEmployee}
                />
                <Pagination pagination={pagination} />
            </>
        );
    };

    return (
        <Dash>
            <div className="employees-list">
                <h2>Employees</h2>
                <div className="controls">
                    <button className="add-employee-button" onClick={handleShowAllEmployees}>
                        Show All
                    </button>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={() => setIsSearching(true)}
                    />
                    <button onClick={() => setIsSearching(true)}>Search</button>
                    {isSearching && <button onClick={handleExportSearch}>Export Search Results</button>}
                    <button onClick={handleExportTable}>Export Table</button>
                    <button onClick={handleAddEmployee}>Add Employee</button>
                </div>

                {/* <div className="content-area"> */}
                {(isSearching || showAllEmployees) && (
                    renderContent()
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
                                <EmployeeDetailsModal
                                    employee={selectedEmployee}
                                    onClose={() => setSelectedEmployee(null)}
                                    onSave={handleUpdateEmployee}
                                    onDelete={handleDeleteEmployee}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
                <AddEmployeeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddEmployee}
                    newEmployee={newEmployee}
                    handleNewEmployeeChange={handleNewEmployeeChange}
                />
            </div>
            {/* </div> */}
        </Dash>
    );
};

export default ListEmployees;
