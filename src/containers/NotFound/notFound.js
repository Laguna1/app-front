import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound = () => (
  <div className="not-found">
    <h2 className="nf-title">
      404
    </h2>
    <p className="nf-text">
      Page is not found.
    </p>
    <Link className="nf-link" to="/">
      To Homepage
    </Link>
  </div>
);

export default NotFound;
