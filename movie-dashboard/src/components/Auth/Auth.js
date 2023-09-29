import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as constants from "../../config/constants"
function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Make a POST request to your login endpoint with email and password
      const response = await axios.post(constants.HOST_URL + '/login', { email, password });
      // Store the JWT token from the response in local storage
      localStorage.setItem('token', response.data.token);
      // Redirect to the dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your email and password.'); // Set error message
    
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <div className="error-alert">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Auth;
