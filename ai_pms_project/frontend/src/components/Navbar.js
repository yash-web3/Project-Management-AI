import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Navbar({ location, onAIClick }) {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="branding">
          <h1><span className="highlight">TCS</span> Project Management</h1>
        </div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>Projects</Link>
            </li>
            <li className="nav-item">
              <Link to="/tasks" className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}>Tasks</Link>
            </li>
            <li className="nav-item">
              <Link to="/ai-insights" className={`nav-link ${location.pathname === '/ai-insights' ? 'active' : ''}`}>AI Insights</Link>
            </li>
          </ul>
        </nav>
        <button onClick={onAIClick} className="ai-icon" aria-label="AI Options">
          🤖
        </button>
      </div>
    </header>
  );
}

export default withRouter(Navbar);