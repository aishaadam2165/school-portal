"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StudentDashboard() {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState(null);

  // Load student info from localStorage
  useEffect(() => {
    const savedStudent = localStorage.getItem("student");
    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
    }
  }, []);

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="btn btn-dark d-md-none m-2"
        onClick={() => setOpen(true)}
      >
        ☰ Menu
      </button>

      <div className="container-fluid">
        <div className="row">

          {/* SIDEBAR */}
          <aside
            className={`sidebar registerform rounded-0 text-light p-3 col-md-2 ${open ? "open" : ""}`}
          >
            {/* Close button for mobile */}
            <button
              className="btn btn-danger d-md-none mb-3"
              onClick={() => setOpen(false)}
            >
              ✕ Close
            </button>

            <h4 className="mb-4">Student Menu</h4>

            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link className="nav-link text-light" href="/student-dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-light" href="/student-dashboard/subjects">
                  Subjects
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-light" href="/student-dashboard/results">
                  Results
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-light" href="/student-dashboard/fees">
                  Fees
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-light" href="/student-dashboard/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </aside>

          {/* MAIN CONTENT */}
          <main className={`col-12 col-md-10 p-4 ${open ? "content-shift" : ""}`}>
            <h1 className="mb-4">
              Hello{student ? `, ${student.firstName} ${student.surname}` : ""} 👋
            </h1>
            <p>
              Welcome to your student dashboard. Here you can check your subjects,
              results, fees, and update your profile.
            </p>
          </main>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .sidebar {
          min-height: 100vh;
        }

        @media (max-width: 768px) {
          /* Mobile sidebar hidden by default */
          .sidebar {
            position: fixed;
            top: 0;
            left: -260px;
            width: 240px;
            height: 100%;
            z-index: 2000;
            transition: left 0.3s ease;
          }
          /* Show when open */
          .sidebar.open {
            left: 0;
          }

          /* Shift main content when sidebar open (optional) */
          .content-shift {
            margin-left: 240px;
            transition: margin-left 0.3s ease;
          }
        }
      `}</style>
    </>
  );
}
