import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { searchEmployees } from '../api';
import EmployeeDetails from '../components/modals/EmployeeDetailsModal';
import NotificationDrawer from '../components/NotificationDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/layoutStyling.css';

import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';

const Dash = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    const clientId = '1';

    return (
        <div className="dashboard-layout">
            <nav className="navbar">
                <div className="navbar-left">
                    {/* <img src="src/assets/logo-no-background.svg" className="logo" /> */}
                </div>
                <div className="navbar-center">
                    {/* Search bar*/}
                    <img src="src/assets/logo-no-background.svg" className="logo" ></img>
                </div>
                <div className="navbar-right">
                    <button className="icon-button" onClick={toggleDrawer}>
                        <NotificationsIcon />
                    </button>
                    <button className="icon-button"><SettingsIcon /></button>
                    <button className="icon-button"><AccountCircleIcon /></button>
                    <div className="user-profile">
                        {/* <img src="../assets/avatar.png" alt="User Avatar" className="avatar" /> */}
                    </div>
                </div>
            </nav>

            <div className="main-content-wrapper">
                <nav className="sidebar">
                    <ul>
                        <li><Link to="/dashboard"><DashboardIcon /><span>Dashboard</span></Link></li>
                        <li><Link to="/employees"><PeopleIcon /><span>Employees</span></Link></li>
                        <li><Link to="/salaries"><AttachMoneyIcon /><span>Payroll</span></Link></li>
                        <li><Link to="/reports"><DescriptionIcon /><span>Exports</span></Link></li>
                        <li><Link to="/filings"><DescriptionIcon /><span>Filings</span></Link></li>
                        <li><Link to="/hr"><PeopleIcon /><span>HR</span></Link></li>
                        <li><Link to="/company"><BusinessIcon /><span>Company</span></Link></li>
                    </ul>
                </nav>

                <div className="content-area">
                    {children}
                </div>

                {/* Notification Drawer */}
                <NotificationDrawer
                    clientId={clientId}
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
