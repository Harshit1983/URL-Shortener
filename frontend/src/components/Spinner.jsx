import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'normal' }) => {
  const spinnerClass = size === 'small' ? 'spinner spinner-small' : 'spinner';

  return <div id="app-spinner" className={spinnerClass} role="status" aria-label="Loading"></div>;
};

export default Spinner;