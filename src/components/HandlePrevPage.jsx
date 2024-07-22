
import React from 'react';

const HandlePrevPage = ({ page, setPage, setLoading }) => {
    const prevPage = () => {
      setLoading(true);
      setPage((prev) => (prev > 0 ? prev - 1 : 0));
    };
    return <button onClick={prevPage} disabled={page === 1}>Previous</button>;
  };

export default HandlePrevPage;
