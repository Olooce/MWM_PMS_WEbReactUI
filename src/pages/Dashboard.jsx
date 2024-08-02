import React, { useState, useEffect } from 'react';
import Dash from "../layout/Dash";
import { motion } from 'framer-motion';
import { FaUsers, FaMoneyBillWave, FaBuilding, FaChartLine } from 'react-icons/fa';
import '../styles/dashboardStyling.css';
import { getAllEmployees, getTotalSalary, getAllDepartments } from '../api'; 

export function Dashboard() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);
    const [totalDepartments, setTotalDepartments] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employeesResponse, salaryResponse, departmentsResponse] = await Promise.all([
                    getAllEmployees(1, 1), 
                    getTotalSalary(),
                    getAllDepartments(1, 1),
                ]);

                console.log('Employees Response:', employeesResponse);
                console.log('Salary Response:', salaryResponse);
                console.log('Departments Response:', departmentsResponse);

                if (employeesResponse.data && employeesResponse.data.totalElements !== undefined) {
                    setTotalEmployees(employeesResponse.data.totalElements);
                } else {
                    console.error('Invalid employees response structure:', employeesResponse);
                }

                if (salaryResponse.data && salaryResponse.data.totalSalary !== undefined) {
                    setTotalSalary(salaryResponse.data.totalSalary);
                } else {
                    console.error('Invalid salary response structure:', salaryResponse);
                }

                if (departmentsResponse.data && departmentsResponse.data.totalElements !== undefined) {
                    setTotalDepartments(departmentsResponse.data.totalElements);
                } else {
                    console.error('Invalid departments response structure:', departmentsResponse);
                }

               
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchData();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    const cards = [
        { icon: <FaUsers />, title: "Employees", value: totalEmployees.toLocaleString() },
        { icon: <FaMoneyBillWave />, title: "Total Salary", value: `$${totalSalary.toLocaleString()}` },
        { icon: <FaBuilding />, title: "Departments", value: totalDepartments },
        { icon: <FaChartLine />, title: "Growth", value: `${growthPercentage}%` }
    ];

    return (
        <Dash>
            <div className="dashboard-container">
                <h1 className="dashboard-title">Dashboard</h1>
                <div className="dashboard-grid">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="dashboard-card"
                            variants={cardVariants}
                            initial="hidden"
                            animate={isLoaded ? "visible" : "hidden"}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="card-header">
                                <div className="card-icon">
                                    {card.icon}
                                </div>
                                <h2 className="card-title">{card.title}</h2>
                            </div>
                            <p className="card-value">{card.value}</p>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    className="activity-section"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="activity-title">Recent Activity</h2>
                    <ul className="activity-list">
                        <li className="activity-item">New employee John Doe added</li>
                        <li className="activity-item">Salary adjustment for Jane Smith</li>
                        <li className="activity-item">Department restructure: Marketing</li>
                        <li className="activity-item">Performance review completed for Q2</li>
                    </ul>
                </motion.div>
            </div>
        </Dash>
    );
}
