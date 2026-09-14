import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import './RegisterPage.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Email address is invalid.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    return errors;
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });

    setServerError('');
    setSuccess('');

    if (formErrors[fieldName]) {
      setFormErrors({
        ...formErrors,
        [fieldName]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError('');
    setSuccess('');

    const validationErrors = validate();

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const res = await registerUser(userData);

      console.log('Registration successful:', res);

      if (res && res.token) {
        login(res.token);
        navigate('/dashboard');
      } else {
        setSuccess('Registration successful! Please log in.');
        setFormData({
          name: '',
          email: '',
          password: '',
        });
        setFormErrors({});
      }
    } catch (err) {
      console.error('Registration error:', err);

      if (err && err.message) {
        setServerError(err.message);
      } else if (err && err.error) {
        setServerError(err.error);
      } else {
        setServerError(
          'Registration failed. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="register-page" className="auth-container">
      <header className="auth-header">
        <h2 id="register-title" className="auth-title">Create Your Account</h2>
        <p className="auth-subtitle">Join us to start creating your own short links!</p>
      </header>

      <form id="register-form" className="auth-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className={`form-input ${formErrors.name ? 'input-error' : ''}`}
            required
          />

          {formErrors.name && (
            <p className="field-error-text">
              {formErrors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className={`form-input ${formErrors.email ? 'input-error' : ''}`}
            required
          />

          {formErrors.email && (
            <p className="field-error-text">
              {formErrors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className={`form-input ${formErrors.password ? 'input-error' : ''}`}
            required
          />

          {formErrors.password && (
            <p className="field-error-text">
              {formErrors.password}
            </p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <p id="register-server-error" className="server-error-text">
            {serverError}
          </p>
        )}

        {/* Register Button */}
        <button
          id="register-submit-btn"
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      {/* Success Message */}
      {success && (
        <p id="register-success-message" className="success-message">
          {success}
        </p>
      )}

      <footer className="auth-footer">
        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Login here</Link>
        </p>
      </footer>
    </div>
  );
}