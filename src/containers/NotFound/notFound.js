import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound = () => (
  <div className="not-found">
    <div className="nf-title">
      404
    </div>
    <div className="nf-text">
      Page is not found.
    </div>
    <Link className="nf-link" to="/">
      To Homepage
    </Link>
  </div>
);

export default NotFound;
