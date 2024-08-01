import { useState, useEffect, useCallback } from 'react';
import { getAllEmployees, searchEmployees, addNewEmployee, updateEmployee, deleteEmployee, exportSearch, exportTable } from '../api';
import usePagination from './usePagination'; // Import the usePagination hook

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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

  const pagination = usePagination();

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = isSearching 
        ? await searchEmployees(searchTerm, pagination.page, pagination.size)
        : await getAllEmployees(pagination.page, pagination.size);
      setEmployees(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isSearching, searchTerm, pagination.page, pagination.size]);
 
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleAddEmployee = async () => {
    
  }

  const handlePostEmployee = async () => {
    setLoading(true);
    try {
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
    }
  };

  const handleUpdateEmployee = async (employeeId) => {
    setLoading(true);
    try {
      await updateEmployee(employeeId, selectedEmployee);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    setLoading(true);
    try {
      await deleteEmployee(employeeId);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportSearch = useCallback(async () => {
    setLoading(true);
    try {
      await exportSearch('employees', searchTerm);
    } catch (error) {
      console.error("Error exporting search results:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const handleExportTable = useCallback(async () => {
    setLoading(true);
    try {
      await exportTable('employees');
    } catch (error) {
      console.error("Error exporting table:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    employees,
    loading,
    error,
    pagination, // Provide pagination object
    isSearching,
    searchTerm,
    selectedEmployee,
    newEmployee,
    setIsSearching,
    setSearchTerm,
    setLoading,
    setSelectedEmployee,
    setNewEmployee,
    fetchEmployees,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    handleExportSearch,
    handleExportTable,
  };
};

export default useEmployees;
