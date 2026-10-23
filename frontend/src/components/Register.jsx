import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import mountainImage from '../assets/Serene Sunrise Mountain Valley.png'
import {
  MountainLogo,
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ChevronLeftIcon,
  AlertCircleIcon,
} from './AuthIcons'
import './Auth.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Existing password criteria checks
  const passwordLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // Clear any previous error

    if (confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/register', {
        name: name,
        email: email,
        password: password,
      })
      console.log(response.data)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      navigate('/')
    } catch (err) {
      console.log(err.response)

      if (err.response?.status === 422) {
        setError(err.response.data.message)
      } else {
        setError('Something went wrong, Please try again')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        {/* Visual Brand & Mountain Panel */}
        <div
          className="auth-visual-panel"
          style={{ backgroundImage: `url("${mountainImage}")` }}
        >
          <div className="auth-visual-overlay" />

          {/* Mobile Back Button */}
          <Link to="/login" className="auth-mobile-back" aria-label="Back to login">
            <ChevronLeftIcon />
          </Link>

          {/* Branding */}
          <div className="auth-branding">
            <MountainLogo />
            <span className="auth-brand-text">TaskTracker</span>
          </div>

          {/* Motivational Quote */}
          <div className="auth-quote-box">
            <h2 className="auth-quote-title">
              A more{'\n'}productive you{'\n'}starts here.
            </h2>
            <p className="auth-quote-subtitle">
              Organize your tasks, capture your ideas,{'\n'}and achieve your goals.
            </p>
          </div>
        </div>

        {/* Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Create your account</h1>
              <p>Join TaskTracker and start your journey</p>
            </div>

            {error && (
              <div className="auth-error-banner" role="alert">
                <AlertCircleIcon />
                <span>{error}</span>
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="auth-field">
                <label htmlFor="register-name" className="auth-field-label">
                  Name
                </label>
                <div className="auth-input-wrapper">
                  <UserIcon />
                  <input
                    id="register-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="auth-field">
                <label htmlFor="register-email" className="auth-field-label">
                  Email
                </label>
                <div className="auth-input-wrapper">
                  <MailIcon />
                  <input
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <label htmlFor="register-password" className="auth-field-label">
                  Password
                </label>
                <div className="auth-input-wrapper has-toggle">
                  <LockIcon />
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                {/* Password Criteria Feedback */}
                {password.length > 0 && (
                  <div className="auth-password-criteria">
                    <div className={`criteria-item ${passwordLength ? 'met' : ''}`}>
                      <span className="criteria-icon">{passwordLength ? '✓' : '○'}</span>
                      <span>8+ characters</span>
                    </div>
                    <div className={`criteria-item ${hasUppercase ? 'met' : ''}`}>
                      <span className="criteria-icon">{hasUppercase ? '✓' : '○'}</span>
                      <span>1 uppercase</span>
                    </div>
                    <div className={`criteria-item ${hasLowercase ? 'met' : ''}`}>
                      <span className="criteria-icon">{hasLowercase ? '✓' : '○'}</span>
                      <span>1 lowercase</span>
                    </div>
                    <div className={`criteria-item ${hasNumber ? 'met' : ''}`}>
                      <span className="criteria-icon">{hasNumber ? '✓' : '○'}</span>
                      <span>1 number</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="auth-field">
                <label htmlFor="register-confirm-password" className="auth-field-label">
                  Confirm Password
                </label>
                <div className="auth-input-wrapper has-toggle">
                  <LockIcon />
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span>or</span>
            </div>

            {/* Footer */}
            <p className="auth-footer">
              Already have an account?{' '}
              <Link to="/login" className="auth-footer-link">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register