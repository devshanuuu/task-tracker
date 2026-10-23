import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import mountainImage from '../assets/Serene Sunrise Mountain Valley.png'
import {
  MountainLogo,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ChevronLeftIcon,
  AlertCircleIcon,
} from './AuthIcons'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/login', { email: email, password: password })
      console.log(response.data)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      if (rememberMe) {
        localStorage.setItem('remembered_email', email)
      } else {
        localStorage.removeItem('remembered_email')
      }
      navigate('/')
    } catch (err) {
      console.log(err.response)
      if (err.response?.status === 422) {
        setError(err.response.data.message)
      } else if (err.response?.status === 401) {
        setError('Invalid Email or Password.')
      } else {
        setError('Something went wrong. Please try again')
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
          <Link to="/" className="auth-mobile-back" aria-label="Go back">
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
              Small steps{'\n'}lead to big results.
            </h2>
            <p className="auth-quote-subtitle">
              Stay organized, focused,{'\n'}and make progress every day.
            </p>
          </div>
        </div>

        {/* Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Welcome back</h1>
              <p>Log in to your account to continue</p>
            </div>

            {error && (
              <div className="auth-error-banner" role="alert">
                <AlertCircleIcon />
                <span>{error}</span>
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="auth-field">
                <label htmlFor="login-email" className="auth-field-label">
                  Email
                </label>
                <div className="auth-input-wrapper">
                  <MailIcon />
                  <input
                    id="login-email"
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
                <label htmlFor="login-password" className="auth-field-label">
                  Password
                </label>
                <div className="auth-input-wrapper has-toggle">
                  <LockIcon />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
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
              </div>

              {/* Remember me & Forgot password */}
              <div className="auth-options">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <span
                  className="auth-forgot-link"
                  tabIndex={0}
                  role="button"
                  onClick={() => alert('Please contact your administrator to reset your password.')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      alert('Please contact your administrator to reset your password.')
                    }
                  }}
                >
                  Forgot password?
                </span>
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
                    <span>Logging in...</span>
                  </>
                ) : (
                  'Log in'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span>or</span>
            </div>

            {/* Footer */}
            <p className="auth-footer">
              Don't have an account?{' '}
              <Link to="/register" className="auth-footer-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login