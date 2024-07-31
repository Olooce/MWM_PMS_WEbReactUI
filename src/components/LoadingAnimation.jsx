import React from 'react';
import { motion } from 'framer-motion';
import '../styles/LoadingAnimation.css';

const LoadingAnimation = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="loading-animation"
    >
        <div className="spinner"></div>
    </motion.div>
);

export default LoadingAnimation;
