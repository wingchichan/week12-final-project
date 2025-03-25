'use client';

import React from 'react';
import Link from 'next/link';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="logo">
          <Link href="/" className="nav-item logo-item">
            SOС<span className="italic-c">С</span>AL
          </Link>
        </li>
        <li>
          <Link href="/calendars" className="nav-item calendar-link">
            My Calendar
          </Link>
        </li>
        <li>
          <Link href="/my-groups" className="nav-item calendar-link">
            My Groups
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

