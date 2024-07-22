import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ListSalaries from './pages/ListSalaries';
import Listemployees from './pages/EmployeeList';
import EmployeeDetailsModal from './pages/modals/EmployeeDetailsModal';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import { Dashboard } from './pages/Dashboard';

const App = () => {
  return (
    <Router>   
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/salaries" element={<ListSalaries />} /> 
          <Route path="/employee/:id" element={<EmployeeDetailsModal />} />
          <Route path="/employees" element={<Listemployees/>} /> 
          <Route path="/login" element={<Loginpage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
  );
};

export default App;
