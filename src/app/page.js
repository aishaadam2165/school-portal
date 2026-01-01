"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="home-container container">
      <Navbar />

      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our School Portal</h1>
          <p>Excellence in Academics, Character, and Innovation — From Nursery to High School.</p>

          <div className="hero-buttons-green mb-3 btn btn-outline-light text-dark">
            <Link href="/login">Student Login</Link>
            
          </div>
          <div className="hero-buttons-green mb-3 btn btn-outline-light text-dark">
            
            <Link href="/login">Teacher Login</Link>
          </div>
        </div>
      </header>

      <section className="school-sections container">
        
        <h2>Our School Sections</h2>

        <div className="sections-grid">
          <Link href="/sections/nursery-primary">Nursery & Primary</Link>
          <Link href="/sections/day-secondary">Day Secondary School</Link>
          <Link href="/sections/high-school">High School</Link>
          <Link href="/sections/boarding">Boarding School</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
