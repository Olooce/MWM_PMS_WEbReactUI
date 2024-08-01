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


const ListEmployees = () => {
  const {
    employees,
    loading,
    error,
    pagination,
    isSearching,
    searchTerm,
    selectedEmployee,
    setSelectedEmployee,
    newEmployee,
    setNewEmployee,
    fetchEmployees,
    handleAddEmployee,
    handlePostEmployee,
    handleShowEmployeeDetails,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleExportSearch,
    handleExportTable,
    isAddEmployeeModalOpen,
    isEmployeeDetailsModalOpen,
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
          showEmployeeDetails={handleShowEmployeeDetails}
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

        {renderContent()}

        {isEmployeeDetailsModalOpen && selectedEmployee && (
          <EmployeeDetailsModal
            employee={selectedEmployee}
            onClose={() => setIsEmployeeDetailsModalOpen(false)}
            onSave={handleUpdateEmployee}
            onDelete={handleDeleteEmployee}
          />
        )}

        {isAddEmployeeModalOpen && (
          <AddEmployeeModal
            isOpen={isAddEmployeeModalOpen}
            onClose={() => setIsAddEmployeeModalOpen(false)}
            onSubmit={handlePostEmployee}
            newEmployee={newEmployee}
            handleNewEmployeeChange={(e) =>
              setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
            }
          />
        )}
      </div>
    </Dash>
  );
};

export default ListEmployees;