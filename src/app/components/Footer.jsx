'use client';

import React from 'react';
import Link from 'next/link';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        Project by Wing, Taran, Wahid and Maria
      </div>
      <div className="social-media">
        <Link href="https://facebook.com" target="_blank">Facebook</Link>
        <Link href="https://twitter.com" target="_blank">Twitter</Link>
        <Link href="https://linkedin.com" target="_blank">LinkedIn</Link>
      </div>
    </footer>
  );
};

export default Footer;
