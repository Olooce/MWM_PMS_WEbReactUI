import React from 'react';

function Pagination({ pagination }) {
    const { page, setPage, inputPage, setInputPage, inputSize, setInputSize, goToPage } = pagination;

    return (
        <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <span className="page-info">Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
            <div className="page-controls">
                <input
                    type="number"
                    value={inputPage}
                    onChange={(e) => setInputPage(Number(e.target.value))}
                    placeholder="Page number"
                    className="page-input"
                    min={1}
                />
                <input
                    type="number"
                    value={inputSize}
                    onChange={(e) => setInputSize(Number(e.target.value))}
                    placeholder="Page size"
                    className="size-input"
                    min={1}
                />
                <button onClick={() => goToPage(inputPage, inputSize)} className="go-button">Go</button>
            </div>
        </div>
    );
}

export default Pagination;
