import React, { useState } from 'react';
import { createShortUrl } from '../services/apiService';
import Spinner from '../components/Spinner';
import './HomePage.css';

export default function HomePage() {

  const [longUrl, setLongUrl] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateUrl = () => {

    const errors = {};

    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
      'i'
    );

    if (!longUrl) {

      errors.longUrl = 'URL field cannot be empty.';

    } else if (!urlPattern.test(longUrl)) {

      errors.longUrl =
        'Please enter a valid URL (e.g., https://example.com).';
    }

    return errors;
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setIsCopied(false);
    setServerError('');
    setShortUrlData(null);

    const validationErrors = validateUrl();

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {

      // Check whether the user is logged in
      const token = localStorage.getItem('token');

      console.log(
        'Creating short URL. Token:',
        token ? 'TOKEN_PRESENT' : 'NO_TOKEN'
      );

      // Send URL to backend
      // createShortUrl() will automatically send the token
      const data = await createShortUrl(longUrl);

      console.log('Server response:', data);

      // Check whether backend returned URL data
      if (data && data.data) {

        console.log(
          'Created URL user:',
          data.data.user || 'NO_USER_ASSOCIATED'
        );

        setShortUrlData(data.data);

      } else {

        console.error(
          'Unexpected server response:',
          data
        );

        setServerError(
          'The server returned an unexpected response.'
        );

        setShortUrlData(null);
      }

    } catch (err) {

      console.error(
        'Create short URL error:',
        err
      );

      const errorMessage =
        err.message ||
        'An unexpected error occurred.';

      setServerError(errorMessage);

      setShortUrlData(null);

      alert(`Error: ${errorMessage}`);

    } finally {

      setIsLoading(false);
    }
  };


  const handleCopy = async () => {

    if (!shortUrlData || !shortUrlData.shortUrl) {
      return;
    }

    try {

      await navigator.clipboard.writeText(
        shortUrlData.shortUrl
      );

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      alert('URL Copied to clipboard!');

    } catch (err) {

      console.error(
        'Failed to copy URL:',
        err
      );

      alert('Failed to copy URL.');
    }
  };


  return (
    <div
      id="url-shortener-app"
      className="shortener-container"
    >

      <header className="shortener-header">

        <h2
          id="app-title"
          className="title"
        >
          URL Shortener
        </h2>

        <p className="subtitle">
          Enter a long URL to make it short and easy to share!
        </p>

      </header>


      <form
        id="url-form"
        className="url-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label
            htmlFor="longUrl-input"
            className="form-label"
          >
            Your Long URL:
          </label>


          <input
            id="longUrl-input"
            className={`form-input ${
              formErrors.longUrl
                ? 'input-error'
                : ''
            }`}
            type="text"
            placeholder="https://example.com"
            value={longUrl}

            onChange={(e) => {

              setLongUrl(e.target.value);

              if (formErrors.longUrl) {
                setFormErrors({});
              }

              if (serverError) {
                setServerError('');
              }

            }}

            disabled={isLoading}
          />


          {formErrors.longUrl && (

            <p className="error-text">
              {formErrors.longUrl}
            </p>

          )}

        </div>


        <button
          id="submit-btn"
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >

          {isLoading
            ? <Spinner size="small" />
            : 'Shorten'
          }

        </button>

      </form>


      {serverError && (

        <p
          id="server-error"
          className="error-text server-error"
        >
          {serverError}
        </p>

      )}


      {shortUrlData && (

        <div
          id="result-box"
          className="result-container"
        >

          <h3 className="result-title">
            Your Short URL is ready!
          </h3>


          <div className="short-url-display">

            <strong className="short-url-label">
              Short Link:
            </strong>


            <a
              id="generated-short-link"
              className="short-url-link"
              href={shortUrlData.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrlData.shortUrl}
            </a>


            <button
              id="copy-btn"
              type="button"
              className={`btn btn-copy ${
                isCopied ? 'copied' : ''
              }`}
              onClick={handleCopy}
            >

              {isCopied
                ? 'Copied!'
                : 'Copy'
              }

            </button>

          </div>


          <p className="original-url-text">

            Original URL:{' '}

            {shortUrlData.longUrl &&
            shortUrlData.longUrl.length > 70

              ? `${shortUrlData.longUrl.substring(
                  0,
                  70
                )}...`

              : shortUrlData.longUrl}

          </p>

        </div>

      )}

    </div>
  );
}