import React, { useState, useEffect } from 'react';
import Dash from "../layout/Dash";
import { motion } from 'framer-motion';
import { FaUsers, FaMoneyBillWave, FaBuilding, FaChartLine } from 'react-icons/fa';
import '../styles/dashboardStyling.css';

export function Dashboard() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    const cards = [
        { icon: <FaUsers />, title: "Employees", value: "1,234" },
        { icon: <FaMoneyBillWave />, title: "Total Salary", value: "$5,678,900" },
        { icon: <FaBuilding />, title: "Departments", value: "15" },
        { icon: <FaChartLine />, title: "Growth", value: "12.5%" }
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