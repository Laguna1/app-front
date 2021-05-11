import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => (

  <footer className="footer">
    <p>FOOTER</p>
    <Link to="/login"><p>Sign In (footer)</p></Link>
    <Link to="/signup"><p>Sign Up (footer)</p></Link>
  </footer>

);

export default Footer;
