import React, { useState } from 'react';
import '../../styles/EmployeeDetails-styling.css'

const EmployeeDetailsModal = ({ employee, onClose, onSave, onDelete }) => {
    const [editableEmployee, setEditableEmployee] = useState({ ...employee });

    const handleChange = (e) => {
        setEditableEmployee({ ...editableEmployee, [e.target.name]: e.target.value });
    };

    const handleSave = () => {

        onSave(editableEmployee.employeeId, editableEmployee);
        console.log(editableEmployee)
    };

    const handleDelete = () => {
        onDelete(editableEmployee.employeeId);
    };


    return (
        <div className="employee-details-overlay">

            <div className="employee-details-container">

                <h2>Employee Details</h2>
                <div className="employee-details-content">

                    <p><strong>ID:</strong> {employee.employeeId}</p>
                    <p>
                        <strong>Name:</strong>
                        <input
                            type="text"
                            name="name"
                            value={editableEmployee.name}
                            onChange={handleChange}
                        />
                    </p>
                    <p>
                        <strong>DOB:</strong>
                        <input
                            type="date"
                            name="dob"
                            value={editableEmployee.dob}
                            onChange={handleChange}
                        />
                    </p>
                    <p>
                        <strong>Gender:</strong>
                        <input
                            type="text"
                            name="gender"
                            value={editableEmployee.gender}
                            onChange={handleChange}
                        />
                    </p>
                    <p>
                        <strong>Department ID:</strong>
                        <input
                            type="text"
                            name="departmentId"
                            value={editableEmployee.departmentId}
                            onChange={handleChange}
                        />
                    </p>
                    <p>
                        <strong>Employment Type:</strong>
                        <input
                            type="text"
                            name="employmentType"
                            value={editableEmployee.employmentType}
                            onChange={handleChange}
                        />
                    </p>
                    <p>
                        <strong>Employment Date:</strong>
                        <input
                            type="date"
                            name="employmentDate"
                            value={editableEmployee.employmentDate}
                            onChange={handleChange}
                        />
                    </p>
                    <p>
                        <strong>Status:</strong>
                        <input
                            type="text"
                            name="status"
                            value={editableEmployee.status}
                            onChange={handleChange}
                        />
                    </p>
                    <p>
                        <strong>Status Description:</strong>
                        <input
                            type="text"
                            name="statusDescription"
                            value={editableEmployee.statusDescription || 'N/A'}
                            onChange={handleChange}
                        />
                    </p>
                    <p>
                        <strong>Termination Date:</strong>
                        <input
                            type="date"
                            name="terminationDate"
                            value={editableEmployee.terminationDate || ''}
                            onChange={handleChange}
                        />
                    </p>
                    <p>
                        <strong>Date Created:</strong> {employee.dateCreated}
                    </p>
                    <p>
                        <strong>Date Modified:</strong> {employee.dateModified}
                    </p>
                </div>
                <div className="employee-details-buttons">

                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>

        </div>
    );
};

export default EmployeeDetailsModal;
