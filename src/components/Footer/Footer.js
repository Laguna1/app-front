import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => (

  <footer className="footer">
    <p>FOOTER</p>
    <Link to="/login"><p>Sign In</p></Link>
    <Link to="/signup"><p>Sign Up</p></Link>
  </footer>

);

export default Footer;
