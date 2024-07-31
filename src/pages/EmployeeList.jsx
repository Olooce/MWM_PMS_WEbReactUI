import React from 'react';
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
    page,
    size,
    isSearching,
    searchTerm,
    selectedEmployee,
    newEmployee,
    setPage,
    setSize,
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

  const handleShowAllEmployees = () => {
    setIsSearching(false);
    setSearchTerm('');
    setPage(1);
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
          page={page}
          size={size}
          showEmployeeDetails={setSelectedEmployee}
        />
        <Pagination
          page={page}
          setPage={setPage}
          size={size}
          setSize={setSize}
          setLoading={() => {}}
        />
      </>
    );
  };

  return (
    <Dash>
      <div className="employees-list">
        <h2>Employees</h2>
        <div className="controls">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={() => setIsSearching(true)}
            handleExportSearch={handleExportSearch}
            handleExportTable={handleExportTable}
            handleAddEmployee={() => setSelectedEmployee(true)}
          />
          <button className="add-employee-button" onClick={handleShowAllEmployees}>
            Show All
          </button>
        </div>

        {renderContent()}

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
    </Dash>
  );
};

export default ListEmployees;
