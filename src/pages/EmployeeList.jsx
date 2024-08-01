import React, { useState } from 'react';
import Dash from "../layout/Dash";
import useEmployees from '../hooks/useEmployees';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import EmployeeTable from '../components/tables/EmployeeTable';
import LoadingAnimation from '../components/LoadingAnimation';
import EmployeeDetailsModal from '../components/modals/EmployeeDetailsModal';
import AddEmployeeModal from '../components/modals/AddEmployeeModal';
import '../styles/pageStyling.css';
import '../styles/listStyling.css';

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
        handleUpdateEmployee,
        handleDeleteEmployee,
        handleExportSearch,
        handleExportTable,
    } = useEmployees();

    const [showAllEmployees, setShowAllEmployees] = useState(false);

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
                    showEmployeeDetails={setSelectedEmployee}
                />
                <Pagination pagination={pagination} />
            </>
        );
    };

    return (
        <Dash>
            <div className="employees-list">
                <div className="controls">
                    <h2>Employees</h2>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={() => setIsSearching(true)}
                        isSearching={isSearching}
                        handleExportSearch={handleExportSearch}
                        handleExportTable={handleExportTable}
                        handleAddEmployee={() => setSelectedEmployee(true)}
                    />
                    <button className="add-employee-button" onClick={handleShowAllEmployees}>
                        Show All
                    </button>
                </div>

                <div className="content-area">
                    {(isSearching || showAllEmployees) && (
                        renderContent()
                    )}

                    {selectedEmployee && (
                        <EmployeeDetailsModal
                            employee={selectedEmployee}
                            onClose={() => setSelectedEmployee(null)}
                            onSave={handleUpdateEmployee}
                            onDelete={handleDeleteEmployee}
                        />
                    )}

                    <AddEmployeeModal
                        isOpen={Boolean(selectedEmployee)}
                        onClose={() => setSelectedEmployee(null)}
                        onSubmit={handleAddEmployee}
                        newEmployee={newEmployee}
                        handleNewEmployeeChange={(e) =>
                            setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
                        }
                    />
                </div>
            </div>
        </Dash>
    );
};

export default ListEmployees;
