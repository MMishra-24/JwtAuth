import React, { useState } from 'react';
import axios from 'axios';
import * as constants from "../../config/constants"

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Make a POST request to the registration endpoint with email and password
      await axios.post(constants.HOST_URL + '/register', { email, password });
      
      // Redirect to the login
      window.location.href = '/';
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
