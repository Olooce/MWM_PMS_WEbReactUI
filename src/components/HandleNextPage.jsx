
import React from 'react';

const HandleNextPage = ({ page, setPage, setLoading }) => {
    const nextPage = () => {
        setLoading(true);
        setPage((prev) => prev + 1);
    };
    return <button onClick={nextPage}>Next</button>;
};

export default HandleNextPage;
