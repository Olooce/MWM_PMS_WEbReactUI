import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepageStyling.css';

export default function Homepage() {
  return (
    <React.Fragment>
      <header className="header">
        <nav className="nav">
          <div className="logo">Mabavu Wealth Managers</div>
          <ul className="nav-links">
            <li>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li>
              <Link className="nav-link" to="/login">Log In</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <h1 className="title">Welcome to Mabavu Wealth Managers</h1>
        <p className="subtitle">Your trusted partner in financial growth and stability</p>
        <Link className="cta-button" to="/">Get Started</Link>
      </main>
    </React.Fragment>
  );
}
