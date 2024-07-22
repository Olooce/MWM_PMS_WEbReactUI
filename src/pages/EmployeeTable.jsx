import React from 'react';

const EmployeeTable = ({ employees, page, size, showEmployeeDetails }) => (
    <div className="table-wrapper">
        <table className="fl-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Department ID</th>
                    <th>Employment Type</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee, index) => (
                    <tr key={employee.employeeId}>
                        <td>
                            <button className="cell-btn" onClick={() => showEmployeeDetails(employee)}>
                                {(page - 1) * size + index + 1}
                            </button>
                        </td>
                        <td>{employee.name}</td>
                        <td>{employee.departmentId}</td>
                        <td>{employee.employmentType}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default EmployeeTable;
