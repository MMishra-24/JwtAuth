import React, { useState } from 'react';
import axios from 'axios';
import * as constants from "../../config/constants"
function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
    </div>
  );
}

export default Auth;
