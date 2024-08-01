import React from 'react';
import Table from '../Table';

const EmployeeTable = ({ employees, page, size, setSelectedEmployee }) => {
    const showEmployeeDetails = (employee) => {
        setSelectedEmployee(employee);
    };

    const columns = [
        {
            key: 'index',
            header: '#',
            render: (value, item, rowIndex) => (
                <button className="cell-btn" onClick={() => showEmployeeDetails(item)}>
                    {(page - 1) * size + rowIndex + 1}
                </button>
            ),
        },
        { key: 'name', header: 'Name' },
        { key: 'departmentId', header: 'Department ID' },
        { key: 'employmentType', header: 'Employment Type' },
    ];

    return (
        <Table
            data={employees}
            columns={columns}
            onRowClick={() => {}}
            page={page}
            size={size}
        />
    );
};

export default EmployeeTable;
