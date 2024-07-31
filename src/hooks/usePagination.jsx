import { useState, useCallback } from 'react';

function usePagination(initialPage = 1, initialSize = 10) {
    const [page, setPage] = useState(initialPage);
    const [size, setSize] = useState(initialSize);
    const [inputPage, setInputPage] = useState(initialPage);
    const [inputSize, setInputSize] = useState(initialSize);
    const [loading, setLoading] = useState(false);

    const goToPage = useCallback((newPage, newSize) => {
        setLoading(true);
        setPage(newPage);
        setSize(newSize);
        setLoading(false);
    }, []);

    return {
        page,
        size,
        inputPage,
        inputSize,
        loading,
        setPage,
        setSize,
        setInputPage,
        setInputSize,
        setLoading,
        goToPage,
    };
}

export default usePagination;
