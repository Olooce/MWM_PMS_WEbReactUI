import React, { useState, useEffect, useCallback } from 'react';
import { getExports } from '../api';
import Dash from "../layout/Dash";
import LoadingAnimation from '../components/LoadingAnimation';
import ExportsTable from '../components/tables/ExportsTable';
import Pagination from '../components/Pagination';
import usePagination from '../hooks/usePagination'; 

export default function ExportList() {
    const [exports, setExports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const pagination = usePagination();

    const fetchExports = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getExports(pagination.page, pagination.size);
            const data = response.data;
            setExports(Array.isArray(data) ? data : []);
        } catch (error) {
            setError(`Error fetching exports: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.size]);

    useEffect(() => {
        fetchExports();
    }, [fetchExports]);

    const renderContent = () => {
        if (error) return <div>Error: {error}</div>;
        if (loading) return <LoadingAnimation />;
        if (exports.length === 0) return <p>No exports found.</p>;

        return <ExportsTable exports={exports} page={pagination.page} size={pagination.size} />;
    };

    return (
        <Dash>
            <div className="export-list">
                <h2>Exports</h2>
                {renderContent()}
                <Pagination pagination={pagination} />
            </div>
        </Dash>
    );
}
