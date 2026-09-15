import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (!formData.email.trim() || !formData.password) {
            setError('Both email and password are required.');
            return;
        }

        setIsLoading(true);

        try {

            const loginData = {
                email: formData.email.trim(),
                password: formData.password,
            };

            const res = await loginUser(loginData);

            console.log('Login response:', res);

            if (res && res.token) {

                login(res.token);

                console.log('Login successful!');
                console.log('Token stored and authentication state updated.');

                navigate('/');

            } else {

                setError(
                    'Login successful, but no token was provided.'
                );

            }

        } catch (err) {

            console.error('Login error:', err);

            if (err && err.message) {
                setError(err.message);
            } else if (err && err.error) {
                setError(err.error);
            } else {
                setError(
                    'Login failed. Please check your email and password.'
                );
            }

        } finally {

            setIsLoading(false);

        }
    };

    return (
        <div id="login-page" className="auth-container">

            <header className="auth-header">

                <h2
                    id="login-title"
                    className="auth-title"
                >
                    Welcome Back!
                </h2>

                <p className="auth-subtitle">
                    Log in to access your dashboard.
                </p>

            </header>

            <form
                id="login-form"
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label
                        htmlFor="email"
                        className="form-label"
                    >
                        Email Address
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />

                </div>

                <div className="form-group">

                    <label
                        htmlFor="password"
                        className="form-label"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-input"
                        placeholder="Enter your Password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />

                </div>

                <button
                    id="login-submit-btn"
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

            </form>

            {error && (
                <p
                    id="login-error-message"
                    className="error-message"
                >
                    {error}
                </p>
            )}

            <footer className="auth-footer">

                <p className="auth-switch">

                    Don't have an account?{' '}

                    <Link
                        to="/register"
                        className="auth-link"
                    >
                        Register now
                    </Link>

                </p>

            </footer>

        </div>
    );
}

