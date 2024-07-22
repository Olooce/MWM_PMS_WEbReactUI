import React from 'react';
import HandleNextPage from '../components/HandleNextPage';
import HandlePrevPage from '../components/HandlePrevPage';

const Pagination = ({ page, setPage, inputPage, setInputPage, inputSize, setInputSize, handleGoToPage }) => (
    <div className="pagination">
        <HandlePrevPage page={page} setPage={setPage} />
        <span className="page-info">Page {page}</span>
        <HandleNextPage page={page} setPage={setPage} />
        <div className="page-controls">
            <input
                type="number"
                value={inputPage}
                onChange={(e) => setInputPage(Number(e.target.value))}
                placeholder="Page number"
                className="page-input"
            />
            <input
                type="number"
                value={inputSize}
                onChange={(e) => setInputSize(Number(e.target.value))}
                placeholder="Page size"
                className="size-input"
            />
            <button onClick={handleGoToPage} className="go-button">Go</button>
        </div>
    </div>
);

export default Pagination;
