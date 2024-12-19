import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Header from '../Components/Header'
import * as jose from 'jose'
import { apiService } from '../services/api'

interface FormErrors {
  name: string
  email: string
  phone: string
  password: string
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [showStrength, setShowStrength] = useState(false);

  const navigate = useNavigate();

  // Comprehensive JWT Validators
  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/
    return nameRegex.test(name) ? '' : 'Dont Be Shy! Let us Know You!'
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) ? '' : 'Are you for Real?'
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return phoneRegex.test(phone) ? '' : 'Chill wont let anyone call you!!'
  }

  const checkPasswordStrength = (pass: string) => {
    let score = 0
    if (pass.length > 4) score += 25
    if (/\d/.test(pass)) score += 25
    if (/[A-Z]/.test(pass)) score += 25
    if (/[!@#$%^&*]/.test(pass)) score += 25

    setStrength(score)
    
    if (score <= 25) return 'Poor'
    if (score <= 75) return 'Medium'
    return 'Strong'
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/
    return passwordRegex.test(password) ? '' : 'Password must contain uppercase, lowercase, number, and special character'
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]: value}))

    switch(name) {
      case 'name':
        setErrors(prev => ({...prev, name: validateName(value)}))
        break
      case 'email':
        setErrors(prev => ({...prev, email: validateEmail(value)}))
        break
      case 'phone':
        setErrors(prev => ({...prev, phone: validatePhone(value)}))
        break
      case 'password':
        setErrors(prev => ({...prev, password: validatePassword(value)}))
        checkPasswordStrength(value)
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields before submission
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const phoneError = validatePhone(formData.phone)
    const passwordError = validatePassword(formData.password)

    if (nameError || emailError || phoneError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        phone: phoneError,
        password: passwordError
      })
      return
    }

    // Proceed with registration logic
    try {
      // Registration API call would go here
      console.log('Registration Data:', formData);
      try {
     await apiService.register({...formData});
        // Handle successful registration
      } catch (error) {
        // Handle registration error
      }

    } catch (error) {
      console.error('Registration failed', error)
    }
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[url('/nature.jpg')] bg-cover bg-center bg-no-repeat">
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        {/* Left Side Content */}
        <div className="w-2/3 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
            <p className="text-xl">Please register to get started</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-1/3 flex justify-center">
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg shadow-xl w-96">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="transform hover:scale-105 transition-transform">
                <label className="block text-white font-semibold drop-shadow-lg">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                {errors.name && <span className="text-red-200 text-sm">{errors.name}</span>}
              </div>

              {/* Email Input */}
              <div className="transform hover:scale-105 transition-transform">
                <label className="block text-white font-semibold drop-shadow-lg">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                {errors.email && <span className="text-red-200 text-sm">{errors.email}</span>}
              </div>

              {/* Phone Input */}
              <div className="transform hover:scale-105 transition-transform">
                <label className="block text-white font-semibold drop-shadow-lg">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                {errors.phone && <span className="text-red-200 text-sm">{errors.phone}</span>}
              </div>
              
              {/* Password Input */}
              <div className="transform hover:scale-105 transition-transform">
                <label className="block text-white font-semibold drop-shadow-lg">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onClick={() => setShowStrength(true)}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                {/* Password Strength Indicator */}
                {showStrength && (
                  <div className="mt-2">
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
                  </div>
                )}
                {errors.password && <span className="text-red-200 text-sm">{errors.password}</span>}
              </div>
              
              {/* Action Buttons */}
              <button
                type="submit"
                className="w-[50%] bg-black/20 text-white py-2 rounded-lg hover:bg-black/50 transition-all transform hover:scale-105 font-semibold backdrop-blur-sm"
              >
                Sign Up
              </button>
              <button
                onClick={handleLogin}
                type="button"
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
