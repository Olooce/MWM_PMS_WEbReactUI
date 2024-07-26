// import React from 'react';

// const EmployeeTable = ({ employees, page, size, showEmployeeDetails }) => (
//     <div className="table-wrapper">
//         <table className="fl-table">
//             <thead>
//                 <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Department ID</th>
//                     <th>Employment Type</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {employees.map((employee, index) => (
//                     <tr key={employee.employeeId}>
//                         <td>
//                             <button className="cell-btn" onClick={() => showEmployeeDetails(employee)}>
//                                 {(page - 1) * size + index + 1}
//                             </button>
//                         </td>
//                         <td>{employee.name}</td>
//                         <td>{employee.departmentId}</td>
//                         <td>{employee.employmentType}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
// );

// export default EmployeeTable;


import React from 'react';
import Table from '../components/Table';

const EmployeeTable = ({ employees, page, size, showEmployeeDetails }) => {
    const columns = [
        {
            key: 'index',
            label: '#',
            render: (value, item, index) => (
                <button className="cell-btn" onClick={() => showEmployeeDetails(item)}>
                    {(page - 1) * size + index + 1}
                </button>
            ),
        },
        { key: 'name', label: 'Name' },
        { key: 'departmentId', label: 'Department ID' },
        { key: 'employmentType', label: 'Employment Type' },
    ];

    return (
        <Table
            data={employees}
            columns={columns}
            onRowClick={showEmployeeDetails}
            page={page}
            size={size}
        />
    );
};

export default EmployeeTable;
