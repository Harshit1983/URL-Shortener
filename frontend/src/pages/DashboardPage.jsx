import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserLinks } from '../services/linkService';
import Spinner from '../components/Spinner';
import './DashboardPage.css';

const DashboardPage = () => {
    const [links, setLinks] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [copiedLinkId, setCopiedLinkId] = useState(null);

    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchLinks = async () => {

            if (!token) {
                setIsLoading(false);
                setError('You are not authorized to view this page. Please log in.');
                return;
            }

            try {
                console.log('Dashboard token exists:', !!token);
                console.log('Dashboard token:', token ? 'TOKEN_PRESENT' : 'NO_TOKEN');

                const res = await getUserLinks(token);

                setLinks(res.links || []);
            } catch (err) {
                console.error('Failed to fetch links:', err);

                const errorMessage =
                    err.error ||
                    err.message ||
                    'Could not load your links.';

                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLinks();

    }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCopy = async (text, linkId) => {

        try {
            await navigator.clipboard.writeText(text);

            setCopiedLinkId(linkId);

            setTimeout(() => {
                setCopiedLinkId(null);
            }, 2000);

        } catch (err) {
            console.error('Failed to copy URL:', err);
            alert('Failed to copy URL.');
        }
    };

    return (
        <div id="dashboard-app" className="dashboard-container">

            <header className="dashboard-header">

                <h2
                    id="dashboard-title"
                    className="dashboard-title"
                >
                    My Dashboard
                </h2>

                <p className="dashboard-subtitle">
                    Welcome to your personal dashboard! Here you will be able
                    to see all the links you have created.
                </p>

            </header>

            <section className="links-section">

                {isLoading ? (

                    <div className="spinner-wrapper">
                        <Spinner />
                    </div>

                ) : error ? (

                    <p
                        id="dashboard-error"
                        className="error-message"
                    >
                        Error: {error}
                    </p>

                ) : links.length > 0 ? (

                    <div className="table-responsive">

                        <table
                            id="links-table"
                            className="links-table"
                        >

                            <thead>
                                <tr>
                                    <th className="th-url">
                                        Original URL
                                    </th>

                                    <th className="th-short">
                                        Short URL
                                    </th>

                                    <th className="th-clicks">
                                        Clicks
                                    </th>

                                    <th className="th-action">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {links.map((link) => (

                                    <tr
                                        key={link._id}
                                        className="table-row"
                                    >

                                        <td className="td-long-url">

                                            <a
                                                href={link.longUrl}
                                                title={link.longUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="url-link long-link"
                                            >
                                                {link.longUrl.length > 50
                                                    ? `${link.longUrl.substring(0, 50)}...`
                                                    : link.longUrl}
                                            </a>

                                        </td>

                                        <td className="td-short-url">

                                            <a
                                                href={link.shortUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="url-link short-link"
                                            >
                                                {link.shortUrl}
                                            </a>

                                        </td>

                                        <td className="td-clicks">
                                            {link.clicks}
                                        </td>

                                        <td className="td-action">

                                            <button
                                                type="button"
                                                className={`btn btn-copy btn-small ${copiedLinkId === link._id
                                                        ? 'copied'
                                                        : ''
                                                    }`}
                                                onClick={() =>
                                                    handleCopy(
                                                        link.shortUrl,
                                                        link._id
                                                    )
                                                }
                                            >
                                                {copiedLinkId === link._id
                                                    ? 'Copied'
                                                    : 'Copy'}
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <p className="empty-message">
                        You haven't created any short links yet.
                        Go to the homepage to create your first one!
                    </p>

                )}

            </section>

            <footer className="dashboard-footer">

                <button
                    id="logout-btn"
                    onClick={handleLogout}
                    className="btn btn-logout"
                >
                    Logout
                </button>

            </footer>

        </div>
    );
};

export default DashboardPage;

