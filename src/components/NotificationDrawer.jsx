import React, {useState, useEffect} from 'react';
import { debounce } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/notificationDrawer.css';

const NotificationDrawer = ({ clientId, isOpen, onClose }) => {
    const [notifications, setNotifications] = useState([]);

    // Debounced function to batch notification updates
    const debouncedSetNotifications = debounce((newNotification) => {
        setNotifications(prev => [...prev, newNotification]);
    }, 300); // Adjust debounce delay as needed

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:8080/api/notifications?clientId=${clientId}`);
        eventSource.onmessage = (event) => {
            debouncedSetNotifications(event.data);
            console.log(event);
        };

        return () => eventSource.close();
    }, [clientId]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="notification-drawer"
                >
                    <div className="drawer-header">
                        <h2>Notifications</h2>
                        <button className="close-drawer-btn" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <div className="drawer-content">
                        {notifications.length > 0 ? (
                            <ul>
                                {notifications.map((notification, index) => (
                                    <li key={index}>{notification}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No notifications</p>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationDrawer;
