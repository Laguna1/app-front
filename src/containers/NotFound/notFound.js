import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found">
    <h2 className="">
      404
    </h2>
    <p className="">
      Page was not found.
    </p>
    <Link className="" to="/">
      To Homepage
    </Link>
  </div>
);

export default NotFound;
