import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { apiService } from '../services/api';

const LoginForm = () => {
      const [password, setPassword] = useState('');
      const [email, setEmail] = useState('');
      const [error, setError] = useState('');
      const navigate=useNavigate();

      const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      
        // Basic validation
        if (!email || !password) {
          setError('Please enter both email and password');
          return;
        }
      
        try {
          // API call to login endpoint
          const response = await apiService.login({
            email,
            password
          });
      
          // Successful login
          console.log('Login successful', response);
          
          // Store user token or session information 
          localStorage.setItem('userToken', response.token);
          
          // Navigate to dashboard or home page
          navigate('/dashboard');
      
        } catch (error: any) {
          // Handle login errors
          setError(error.message || 'Login failed. Please try again.');
          console.error('Login error:', error);
        }
      };
      
      const handleSignUp=()=>{
        navigate('/');
      }
  return (<div className="min-h-screen bg-[url('/nature.jpg')] bg-cover bg-center bg-no-repeat ">
      <Header />
      <div className="flex items-center justify-center  min-h-screen ">
      <div className="w-2/3 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Ciao Mate!</h1>
          <p className="text-xl">Lets Get you Log in Quickly!!</p>
        </div>
      </div>

      <div className="w-1/3 flex justify-center">
        <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg shadow-xl w-96">
        <form className="space-y-4">
          

          <div className="transform hover:scale-105 transition-transform">
            <label className="block text-white font-semibold drop-shadow-lg">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              required
            />
          </div>
           <div className="transform hover:scale-105 transition-transform">
              <label className="block text-white font-semibold drop-shadow-lg">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                maxLength={16}
                required
              />
              {error && <span className="text-red-200 text-sm font-semibold drop-shadow-lg">{error}</span>}
            </div>
            
            <button
              type="submit"
              onClick={handleLogin}
              className="w-[50%] bg-black/20 text-white py-2 rounded-lg hover:bg-black/50 transition-all transform hover:scale-105 font-semibold backdrop-blur-sm"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="w-[50%] bg-black/20 text-white py-2 rounded-lg hover:bg-black/50 transition-all transform hover:scale-105 font-semibold backdrop-blur-sm"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default LoginForm
