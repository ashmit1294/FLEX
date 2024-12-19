import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const navigate=useNavigate();

      const handleSignUp=()=>{
        navigate('/');
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/nature.jpg')] bg-cover bg-center bg-no-repeat">
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
                maxLength={8}
                required
              />
              {error && <span className="text-red-200 text-sm font-semibold drop-shadow-lg">{error}</span>}
            </div>
            
            <button
              type="submit"
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
  )
}

export default LoginForm
