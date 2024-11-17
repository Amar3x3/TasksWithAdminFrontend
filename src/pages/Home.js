import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
      {/* App Title */}
      <h1 className="text-5xl font-bold mb-10 text-center">Assignment Submission Portal</h1>

      {/* Description */}
      <p className="text-lg mb-12 text-center max-w-xl">
        Welcome to the Assignment Submission Portal! Register as a User to upload your assignments or as an Admin to review them.
      </p>

      {/* Buttons Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Register as User */}
        <button
          onClick={() => navigate('/users/register')}
          className="bg-green-500 hover:bg-green-700 py-3 px-8 rounded-md text-lg shadow-lg transform hover:-translate-y-1 transition duration-200"
        >
          Register as User
        </button>

        {/* Register as Admin */}
        <button
          onClick={() => navigate('/admins/register')}
          className="bg-yellow-500 hover:bg-yellow-700 py-3 px-8 rounded-md text-lg shadow-lg transform hover:-translate-y-1 transition duration-200"
        >
          Register as Admin
        </button>

        {/* Login as User */}
        <button
          onClick={() => navigate('/users/login')}
          className="bg-blue-500 hover:bg-blue-700 py-3 px-8 rounded-md text-lg shadow-lg transform hover:-translate-y-1 transition duration-200"
        >
          Login as User
        </button>

        {/* Login as Admin */}
        <button
          onClick={() => navigate('/admins/login')}
          className="bg-red-500 hover:bg-red-700 py-3 px-8 rounded-md text-lg shadow-lg transform hover:-translate-y-1 transition duration-200"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default Home;
