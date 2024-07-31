import React from 'react';
import Table from '../../components/Table';

const SalariesTable = ({ salaries, page, size, showSalaryDetails }) => {
  const columns = [
    { header: '#', accessor: (row, index) => (page - 1) * size + index + 1 },
    { header: 'EmployeeID', key: 'employeeId' },
    { header: 'Date', key: 'month' },
    { header: 'NetSalary', key: 'netSalary' }
  ];

  console.log(columns[0].accessor)
  return (
    <Table
      columns={columns}
      data={salaries}
      page={page}
      size={size}
      onRowClick={() => {}}
    />
  );
};

export default SalariesTable;
