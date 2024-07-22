import React, { useState, useEffect, useCallback } from 'react';
import { getAllSalaries } from '../api';
import Dash from "../layout/Dash";
import HandleNextPage from '../components/HandleNextPage';
import HandlePrevPage from '../components/HandlePrevPage';
import { motion } from 'framer-motion';

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

const ListSalaries = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [inputPage, setInputPage] = useState(1);
  const [inputSize, setInputSize] = useState(10);

  const fetchSalaries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllSalaries(page, size);
      const data = response.data;
      console.log("Fetched salaries data:", data);
      const salaryList = data;
      if (salaryList) {
        setSalaries(salaryList);
        console.log("Updated salaries state:", salaryList);
      } else {
        setError('No salary data found');
      }
    } catch (error) {
      if (error.message === "Network Error") {
        setLoading(true);
      } else {
        setError(`Error fetching salaries: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    console.log("Fetching salaries for page:", page);
    fetchSalaries();
  }, [fetchSalaries]);

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

  const renderTable = () => (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th>#</th>
            <th>EmployeeID</th>
            <th>Date</th>
            <th>NetSalary</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary, index) => (
            <tr key={salary.salaryId}>
              <td>{(page - 1) * size + index + 1}</td>
              <td>{salary.employeeId}</td>
              <td>{salary.month}</td>
              <td>{salary.netSalary}</td>
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
    if (salaries.length === 0 && !loading) return <p>No salaries found.</p>;

    return (
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {renderTable()}
      </motion.div>
    );
  };

  return (
    <Dash>
      <div className="salaries-list">
        <h2>Salaries</h2>
        {console.log("Current salaries state:", salaries)}
        {renderContent()}
        {renderPagination()}
      </div>
    </Dash>
  );
};

export default ListSalaries;
