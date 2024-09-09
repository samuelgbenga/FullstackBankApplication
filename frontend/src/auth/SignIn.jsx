import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      if (response.data.token) {
        const token = response.data.token;
        const userRole = response.data.role; // Ensure role is retrieved from the response
        
        // Store the JWT token and role in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);

        // Display success toast message
        toast.success('Login successful!');

        // Redirect based on role
        if (userRole === 'admin') navigate('/admin/dashboard');
        else if (userRole === 'lender') navigate('/lender/dashboard');
        else navigate('/borrower/dashboard');
      }
    } catch (error) {
      // Extract error message and show toast notification
      const errorMessage = error.response && error.response.data ? error.response.data.message : 'Login failed. Please try again.';
      toast.error(errorMessage);
      console.error('SignIn failed', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100">
        <img src="/src/assets/auth.png" alt="SignIn" className="object-cover w-full h-full" />
      </div>
      <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
        <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="example@mail.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="********"
            />
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
            Sign In
          </button>
        </form>
        <ToastContainer />
        <div to="/register"> Don't have an account? Register </div>
      </div>
    </div>
  );
};

export default SignIn;
