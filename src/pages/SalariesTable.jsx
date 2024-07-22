import React from 'react';

const SalariesTable = ({ salaries, page, size }) => (
  <div className="table-wrapper">
    <table className="fl-table">
      <thead>
        <tr>
          <th>#</th>
          <th>EmployeeID</th>
          <th>Date</th>
          <th>NetSalary</th>
        </tr>
      </thead>
      <tbody>
        {salaries.map((salary, index) => (
          <tr key={salary.salaryId}>
            <td>{(page - 1) * size + index + 1}</td>
            <td>{salary.employeeId}</td>
            <td>{salary.month}</td>
            <td>{salary.netSalary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SalariesTable;
