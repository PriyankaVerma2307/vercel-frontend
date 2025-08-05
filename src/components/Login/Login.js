import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  // const [isRegistering, setIsRegistering] = useState(false); // 🔄 toggle login/register

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post('https://vercel-backend-eta-blue.vercel.app/api/register', {
  //       email,
  //       password
  //     });
  //     localStorage.setItem('token', res.data.token);
  //     setIsAuthenticated(true);
  //     setMsg("✅ Registration successful!");
  //   } catch (err) {
  //     setMsg("❌ " + (err.response?.data?.message || "Registration failed"));
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://vercel-backend-eta-blue.vercel.app/api/login', {
        username,
        password
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setIsAuthenticated(true);
        setMsg('✅ Login successful');
      } else {
        setMsg('❌ Login failed');
      }
    } catch (err) {
      setMsg('❌ Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
  <input
    type="text"
    placeholder="👤 username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
  />

  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="🔒 Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button
      type="button"
      className="toggle-btn"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "🙈 Hide" : "👁 Show"}
    </button>
  </div>

  <button type="submit" className="login-btn">Login</button>
</form>


      <p className="login-msg">{msg}</p>
    </div>
  );
}

export default Login;
