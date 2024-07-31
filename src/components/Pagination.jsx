import React from 'react';

function Pagination({ page, setPage, inputPage, setInputPage, inputSize, setInputSize, setLoading }) {

    const handleNextPage = () => {
        setLoading(true);
        setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setLoading(true);
        setPage((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleGoToPage = () => {
        setLoading(true);
        setPage(inputPage);
       
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
            <span className="page-info">Page {page}</span>
            <button onClick={handleNextPage}>Next</button>
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
                <button onClick={handleGoToPage} className="go-button">Go</button>
            </div>
        </div>
    );
}

export default Pagination;
