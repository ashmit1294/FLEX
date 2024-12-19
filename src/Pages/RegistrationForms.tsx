import React,{ useState } from 'react'
import LoginForm from './LoginForm';
import { useNavigate } from "react-router-dom"; 
import Header from '../Components/Header';

const RegistrationForm = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [strength, setStrength] = useState(0);
  const [showStrength, setShowStrength] = useState(false);
  

  const checkPasswordStrength = (pass:any) => {
    let score = 0
    // Basic length check
    if (pass.length > 4) score += 25
    // Contains number
    if (/\d/.test(pass)) score += 25
    // Contains uppercase
    if (/[A-Z]/.test(pass)) score += 25
    // Contains special char
    if (/[!@#$%^&*]/.test(pass)) score += 25

    setStrength(score)
    
    if (score <= 25) return 'Poor'
    if (score <= 75) return 'Medium'
    return 'Strong'
  }

  const navigate = useNavigate();

const handleLogin = () => {
  navigate('/login'); // Navigate to the login route
};

  return (<div className="min-h-screen bg-[url('/nature.jpg')] bg-cover bg-center bg-no-repeat ">
      <Header />
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-2/3 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-xl">Please register to get started</p>
        </div>
      </div>

      <div className="w-1/3 flex justify-center">
        <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg shadow-xl w-96">
        <form className="space-y-4">
          <div className="transform hover:scale-105 transition-transform">
          <label className="block text-white font-semibold drop-shadow-lg">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>

          <div className="transform hover:scale-105 transition-transform">
            <label className="block text-white  font-semibold drop-shadow-lg">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>

          <div className="transform hover:scale-105 transition-transform">
            <label className="block text-white font-semibold drop-shadow-lg">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
            
            <div className="transform hover:scale-105 transition-transform">
              <label className="block text-white font-semibold drop-shadow-lg">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={()=>setShowStrength(true)}
                onChange={(e) => {
                  setPassword(e.target.value)
                  checkPasswordStrength(e.target.value);
                }}
                maxLength={8}
                required
              />
              {/* Password Strength Indicator */}
              {showStrength && <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      strength <= 25 ? 'bg-red-500' :
                      strength <= 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${strength}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-semibold ${
                  strength <= 25 ? 'text-red-200' :
                  strength <= 75 ? 'text-yellow-200' : 'text-green-200'
                }`}>
                  {strength <= 25 ? 'Poor' : strength <= 75 ? 'Medium' : 'Strong'}
                </span>
              </div>}
              {error && <span className="text-red-200 text-sm font-semibold drop-shadow-lg">{error}</span>}
            </div>
            
            <button
              type="submit"
              className="w-[50%] bg-black/20 text-white py-2 rounded-lg hover:bg-black/50 transition-all transform hover:scale-105 font-semibold backdrop-blur-sm"
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              type="button" // Add this to prevent form submission
              className="w-[50%] bg-black/20 text-white py-2 rounded-lg hover:bg-black/50 transition-all transform hover:scale-105 font-semibold backdrop-blur-sm"
            >
              Log In
            </button>

          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default RegistrationForm
