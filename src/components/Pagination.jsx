import React from 'react';





function Pagination({ page, setPage, inputPage, setInputPage, inputSize, setInputSize, handleGoToPage , setLoading}) {

    const HandleNextPage = ({ page, setPage, setLoading }) => {
        const nextPage = () => {
            setLoading(true);
            setPage((prev) => prev + 1);
        };
        return <button onClick={nextPage}>Next</button>;
    };
    const HandlePrevPage = ({ page, setPage, setLoading }) => {
        const prevPage = () => {
          setLoading(true);
          setPage((prev) => (prev > 0 ? prev - 1 : 0));
        };
        return <button onClick={prevPage} disabled={page === 1}>Previous</button>;
      };
    
    return (
            <div className="pagination">
                <HandlePrevPage page={page} setPage={setPage}  setLoading={setLoading}/>
                <span className="page-info">Page {page}</span>
                <HandleNextPage page={page} setPage={setPage}   setLoading={setLoading}/>
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
    )


}

export default Pagination;
