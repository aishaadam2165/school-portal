import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-green px-3">
      <Link href="/home" className="navbar-brand fw-bold">
        School Portal
      </Link>

      {/* Toggler Button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Menu */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" href="/about">About Us</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="/academics">Academics</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="/admission">Admission</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="/school-tour">School Tour</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="/results">Results</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="/staff-mail">Staff Mail</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="/blog">Blog</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="/it-support">IT Support</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/teacher-apply">Apply</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
