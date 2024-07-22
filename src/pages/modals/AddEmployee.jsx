import React from 'react';
import Modal from 'react-modal';
import '../../styles/AddEmployee-Styling.css';

const AddEmployee = ({ isOpen, onClose, onSubmit, newEmployee, handleNewEmployeeChange }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            contentLabel="Add Employee"
        >
            <h2>Add New Employee</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newEmployee.name}
                        onChange={handleNewEmployeeChange}
                    />
                </label>
                <label>
                    Date of Birth:
                    <input
                        type="date"
                        name="dob"
                        value={newEmployee.dob}
                        onChange={handleNewEmployeeChange}
                    />
                </label>
                <label>
                    Gender:
                    <input
                        type="text"
                        name="gender"
                        value={newEmployee.gender}
                        onChange={handleNewEmployeeChange}
                    />
                </label>
                <label>
                    Department ID:
                    <input
                        type="text"
                        name="departmentId"
                        value={newEmployee.departmentId}
                        onChange={handleNewEmployeeChange}
                    />
                </label>
                <label>
                    Employment Type:
                    <input
                        type="text"
                        name="employmentType"
                        value={newEmployee.employmentType}
                        onChange={handleNewEmployeeChange}
                    />
                </label>
                <label>
                    Employment Date:
                    <input
                        type="date"
                        name="employmentDate"
                        value={newEmployee.employmentDate}
                        onChange={handleNewEmployeeChange}
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        name="status"
                        value={newEmployee.status}
                        onChange={handleNewEmployeeChange}
                    />
                </label>
                <label>
                    Status Description:
                    <input
                        type="text"
                        name="statusDescription"
                        value={newEmployee.statusDescription}
                        onChange={handleNewEmployeeChange}
                    />
                </label>
                <label>
                    Termination Date:
                    <input
                        type="date"
                        name="terminationDate"
                        value={newEmployee.terminationDate}
                        onChange={handleNewEmployeeChange}
                    />
                </label>
                <button type="submit">Add Employee</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default AddEmployee;
