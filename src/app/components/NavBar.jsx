'use client';

import React from 'react';
import Link from 'next/link';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar-с">
      <div className="logo">
        <Link href="/" className="nav-item logo-item">
          SO<span className="italic-c">С</span>AL
        </Link>
      </div>
      <ul className="nav-list">
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
        <li>
          <Link href="/all-calendars" className="nav-item calendar-link">
            All Calendars
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
