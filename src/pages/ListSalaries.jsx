import React, { useState, useEffect, useCallback } from 'react';
import {getAllSalaries} from '../api';
import Dash from "../../layout/Dash";
import LoadingAnimation from './LoadingAnimation';
import SalariesTable from './SalariesTable';
import Pagination from './Pagination';

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
      setSalaries(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(`Error fetching salaries: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchSalaries();
  }, [fetchSalaries]);

  const handlePageChange = (e) => setInputPage(Number(e.target.value));
  const handleSizeChange = (e) => setInputSize(Number(e.target.value));
  const handleGoToPage = () => {
    setPage(inputPage);
    setSize(inputSize);
  };

  const renderContent = () => {
    if (error) return <div>Error: {error}</div>;
    if (loading) return <LoadingAnimation />;
    if (salaries.length === 0) return <p>No salaries found.</p>;
    
    return <SalariesTable salaries={salaries} page={page} size={size} />;
  };

  return (
    <Dash>
      <div className="salaries-list">
        <h2>Salaries</h2>
        {renderContent()}
        <Pagination
          page={page}
          setPage={setPage}
          inputPage={inputPage}
          inputSize={inputSize}
          handlePageChange={handlePageChange}
          handleSizeChange={handleSizeChange}
          handleGoToPage={handleGoToPage}
        />
      </div>
    </Dash>
  );
};

export default ListSalaries;
