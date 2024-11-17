import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = ({ role }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Make API request to register the user or admin
      await axios.post(`http://localhost:5000/api/${role}/register`, { name, email, password });
      
      // Show success message
      alert(`Registration successful! Redirecting to ${role === 'users' ? 'User' : 'Admin'} login...`);
      
      // Navigate to the respective login page using absolute paths
      if (role === 'users') {
        navigate('/users/login'); // <-- Absolute path
      } else if (role === 'admins') {
        navigate('/admins/login'); // <-- Absolute path
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed! Please check your details and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register ({role})</h2>
        <input
          type="text"
          className="w-full p-2 border mb-4"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button onClick={handleRegister} className="bg-green-500 text-white p-2 w-full">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
