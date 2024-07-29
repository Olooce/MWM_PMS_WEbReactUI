import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchEmployees } from '../api';
import EmployeeDetails from '../pages/modals/EmployeeDetailsModal';
import NotificationDrawer from '../components/NotificationDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/layoutStyling.css';

const Dash = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await searchEmployees(searchTerm);
            setSearchResults(response.data);
            setShowPopup(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        }
    };

    const closePopup = () => setShowPopup(false);
    const showEmployeeDetails = (employee) => setSelectedEmployee(employee);
    const closeEmployeeDetails = () => setSelectedEmployee(null);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/api/notifications');

        eventSource.onmessage = (event) => {
            setNotifications((prev) => [...prev, event.data]);
        };

        return () => eventSource.close();
    }, []);

    return (
        <div className="dashboard-layout">
            <nav className="navbar">
                <div>
                    <button className="icon-button" onClick={toggleCollapse}>
                        {isCollapsed ? '<' : '>'}
                    </button>
                </div>
                <div className="navbar-left">
                    <img src="src/assets/logo-no-background.svg"  className="logo" />
                </div>
                <div className="navbar-center">
                    {/* Search bar could go here */}
                </div>
                <div className="navbar-right">
                    <button className="icon-button" onClick={toggleDrawer}>
                        <i className="bell-icon"></i>
                    </button>
                    <button className="icon-button"><i className="gift-icon"></i></button>
                    <button className="icon-button"><i className="help-icon"></i></button>
                    <div className="user-profile">
                        {/* <img src="../assets/avatar.png" alt="User Avatar" className="avatar" /> */}
                    </div>
                </div>
            </nav>

            <div className="main-content-wrapper">
                <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                    <ul>
                        <li><Link to="/dashboard"><i className="icon-dashboard"></i><span>Dashboard</span></Link></li>
                        <li><Link to="/employees"><i className="icon-workers"></i><span>Employees</span></Link></li>
                        <li><Link to="/salaries"><i className="icon-payroll"></i><span>Payroll</span></Link></li>
                        <li><Link to="/reports"><i className="icon-reports"></i><span>Reports</span></Link></li>
                        <li><Link to="/filings"><i className="icon-filings"></i><span>Filings</span></Link></li>
                        <li><Link to="/hr"><i className="icon-hr"></i><span>HR</span></Link></li>
                        <li><Link to="/company"><i className="icon-company"></i><span>Company</span></Link></li>
                    </ul>
                </nav>

                <div className="content-area">
                    {children}
                </div>

                {/* Notification Drawer */}
                <NotificationDrawer
                    notifications={notifications}
                    isOpen={isDrawerOpen}
                    onClose={toggleDrawer}
                />

                {/* Popup Modal for Search Results */}
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button className="close-btn" onClick={closePopup}>Close</button>
                            <div className="search-results">
                                {searchResults.length > 0 ? (
                                    <div className="table-wrapper">
                                        <table className="fl-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>DOB</th>
                                                    <th>Gender</th>
                                                    <th>Department ID</th>
                                                    <th>Employment Type</th>
                                                    <th>Employment Date</th>
                                                    <th>Status</th>
                                                    <th>Status Description</th>
                                                    <th>Termination Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchResults.map(employee => (
                                                    <tr key={employee.employeeId}>
                                                        <td><button onClick={() => showEmployeeDetails(employee)}>{employee.employeeId}</button></td>
                                                        <td>{employee.name}</td>
                                                        <td>{employee.dob}</td>
                                                        <td>{employee.gender}</td>
                                                        <td>{employee.departmentId}</td>
                                                        <td>{employee.employmentType}</td>
                                                        <td>{employee.employmentDate}</td>
                                                        <td>{employee.status}</td>
                                                        <td>{employee.statusDescription}</td>
                                                        <td>{employee.terminationDate}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {selectedEmployee && (
                                            <div className="employee-details-overlay">
                                                <AnimatePresence>
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="employee-details-container"
                                                    >
                                                        <EmployeeDetails
                                                            employee={selectedEmployee}
                                                            onClose={closeEmployeeDetails}
                                                        />
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p>No results found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dash;
