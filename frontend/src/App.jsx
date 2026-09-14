import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>

                <Navbar />

                <div className="container">

                    <Routes>

                        <Route
                            path="/"
                            element={<HomePage />}
                        />

                        <Route
                            path="/login"
                            element={<LoginPage />}
                        />

                        <Route
                            path="/register"
                            element={<RegisterPage />}
                        />

                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <DashboardPage />
                                </PrivateRoute>
                            }
                        />

                    </Routes>

                </div>

            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

