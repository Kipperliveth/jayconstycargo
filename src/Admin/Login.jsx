import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config'; 
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import coloredLogo from "../assets/jayconsty-colored-logo.png";
import './Login.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      // Firebase Authentication acts as our DB validation gatekeeper
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard'); 
    } catch (err) {
      console.error(err);
      // Handles cases where the user does not exist in the database or entered wrong info
      setError('Access denied. Invalid credentials or unauthorized user.');
    } finally {
      setIsLoading(false);
    }
  };

const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address first to receive a reset link.');
      return;
    }

    setError('');
    setMessage('');
    setIsResetting(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Check your email inbox.');
    } catch (err) {
      console.error(err);
      
      // Catch specific Firebase error codes
      if (err.code === 'auth/user-not-found') {
        setError('No admin account found with this email address.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a validly formatted email address.');
      } else {
        setError('Failed to send reset link. Please try again later.');
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-content fade-in">
        
        <div className="login-header">
          <img src={coloredLogo} alt="JAYCONSTY. LOGISTICS." className="brand-logo" />
          <h1>Admin Sign In</h1>
          <p>Enter your credentials to access the logistics dashboard.</p>
        </div>

        {error && (
          <div className="feedback-banner error-banner">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}
        {message && (
          <div className="feedback-banner success-banner">
            <CheckCircle2 size={16} /> <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flat-auth-form">
          
          <div className="input-block">
            <label>Email Address</label>
            <div className="input-relative">
              <Mail size={18} className="icon-left" />
              <input 
                type="email" 
                placeholder="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isResetting}
              />
            </div>
          </div>

          <div className="input-block">
            <label>Password</label>
            <div className="input-relative">
              <Lock size={18} className="icon-left" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || isResetting}
              />
              <button 
                type="button" 
                className="btn-toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
                disabled={isLoading || isResetting}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-utilities">
            <button 
              type="button" 
              className="btn-reset-link" 
              onClick={handleResetPassword}
              disabled={isLoading || isResetting}
            >
              {isResetting ? <Loader2 size={14} className="spinner inline-spinner" /> : null}
              Forgot your password?
            </button>
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading || isResetting}>
            {isLoading ? <Loader2 size={20} className="spinner" /> : 'Log In'}
          </button>
          
        </form>

      </div>
    </div>
  );
}

export default Login;