import React from 'react';
import Table from '../../components/Table';

const SalariesTable = ({ salaries, page, size}) => {
  const columns = [
    { header: '#', accessor: (index) => (page - 1) * size + index + 1 },
    { header: 'EmployeeID', key: 'employeeId' },
    { header: 'Date', key: 'month' },
    { header: 'NetSalary', key: 'netSalary' }
  ];

  return (
    <Table
      columns={columns}
      data={salaries}
      onRowClick={() => {}}
    />
  );
};

export default SalariesTable;
