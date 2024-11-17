import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/${role}/login`, { email, password });
      console.log(response.data+" login");
      if (response.data) {
        if(role === 'users') localStorage.setItem('user', JSON.stringify(response.data.user));
        else if(role === 'admins') localStorage.setItem('admin', JSON.stringify(response.data.admin));
        window.location.href = `/${role}/dashboard`;
      }
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login ({role})</h2>
        <input
          type="email"
          className="w-full p-2 border mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
