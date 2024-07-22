import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/loginpageStyling.css";
import { validateCredentials } from '../api';

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const handleLogin = async () => {
    if (captchaInput !== captcha) {
      setLoginFailed(true);
      return;
    }
    try {
      const res = await validateCredentials(username, password);
      if (res.status === 200) {
        setIsLoggedIn(true);
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Invalid credentials');
        setLoginFailed(true);
      } else {
        console.error('Login error:', error);
      }
    }
  };

  const generateCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha(newCaptcha);
  };

  React.useEffect(() => {
    generateCaptcha();
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="container">
      <div className="left-section">
        <h1>Welcome to Mabavu Wealth Managers Portal</h1>
        <p>A gateway to Employee Mahangement  & Payroll Processing.</p>
      </div>
      <div className="right-section">
        <div className="login-form">
          <h2>Log In</h2>
          {loginFailed && <p>Login Failed!</p>}
          <div className="form-group">
            <label htmlFor="username">Email Address</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group captcha-image">
            <label htmlFor="captcha">Captcha</label>
            <input
              type="text"
              id="captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="form-control"
            />
            <img src={`https://dummyimage.com/100x40/000/fff&text=${captcha}`} alt="captcha" />
            <span className="captcha-refresh" onClick={generateCaptcha}>↻</span>
          </div>
          <button onClick={handleLogin} className="btn btn-primary">Log In</button>
        </div>
      </div>
    </div>
  );
}
