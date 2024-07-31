import React, { useEffect, useCallback } from 'react';
import { getAllSalaries } from '../api';
import Dash from "../layout/Dash";
import LoadingAnimation from '../components/LoadingAnimation';
import SalariesTable from '../components/tables/SalariesTable';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/Pagination';

const ListSalaries = () => {
    const pagination = usePagination();

    const fetchSalaries = useCallback(async () => {
        try {
            pagination.setLoading(true);
            const response = await getAllSalaries(pagination.page, pagination.size);
            const data = response.data;
            setSalaries(Array.isArray(data) ? data : []);
        } catch (error) {
            setError(`Error fetching salaries: ${error.message}`);
        } finally {
            pagination.setLoading(false);
        }
    }, [pagination.page, pagination.size]);

    useEffect(() => {
        fetchSalaries();
    }, [fetchSalaries]);

    const renderContent = () => {
        if (pagination.loading) return <LoadingAnimation />;
        if (salaries.length === 0) return <p>No salaries found.</p>;

        return <SalariesTable salaries={salaries} page={pagination.page} size={pagination.size} />;
    };

    return (
        <Dash>
            <div className="salaries-list">
                <h2>Salaries</h2>
                {renderContent()}
                <Pagination pagination={pagination} />
            </div>
        </Dash>
    );
};

export default ListSalaries;
