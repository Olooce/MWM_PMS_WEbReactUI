import React, { useState, useEffect, useCallback } from 'react';
import { getExports } from '../api';
import Dash from "../layout/Dash";
import LoadingAnimation from './LoadingAnimation';
import ExportsTable from './tables/ExportsTable';
import Pagination from '../components/Pagination';

export default function ExportList() {
    const [exports, setExports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [inputPage, setInputPage] = useState(1);
    const [inputSize, setInputSize] = useState(10);

    const fetchExports = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getExports(page, size);
            const data = response.data;
            if (Array.isArray(data)) {
                setExports(data);
            } else {
                setExports([]);
            }
        } catch (error) {
            setError(`Error fetching exports: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [page, size]);


    useEffect(() => {
        fetchExports();
    }, [fetchExports]);

    const handlePageChange = (e) => setInputPage(Number(e.target.value));
    const handleSizeChange = (e) => setInputSize(Number(e.target.value));
    const handleGoToPage = () => {
        setPage(inputPage);
        setSize(inputSize);
    };

    const renderContent = () => {
        if (error) return <div>Error: {error} </div>;
        if (loading) return <LoadingAnimation />;
        if (exports.length === 0) return <p>No exports found.</p>;

        return <ExportsTable exports={exports} page={page} size={size} />;
    };

    return (
        <>
            <Dash>
                <div className="export-list">
                    <h2>Exports</h2>
                    {renderContent()}
                    <Pagination
                        page={page}
                        setPage={setPage}
                        inputPage={inputPage}
                        setInputPage={setInputPage}
                        inputSize={inputSize}
                        setInputSize={setInputSize}
                        handleGoToPage={handleGoToPage}
                        setLoading={setLoading}
                    />
                </div>
            </Dash>
        </>
    );
};