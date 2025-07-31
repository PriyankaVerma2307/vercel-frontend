import React from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <main className="content">
      <div className="card">
        <h2>Welcome to Bhajan Portal</h2>
        <p>Choose your action below:</p>
        <div className="buttons">
          <NavLink to="/data-entry" className="btn">📝 Data Entry</NavLink>
          <NavLink to="/bhajan-list" className="btn">🎵 Bhajan List</NavLink>
        </div>
      </div>
    </main>
  );
}

export default Home;
