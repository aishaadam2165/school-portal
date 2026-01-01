"use client";

import { useState } from "react";

export default function TeacherDashboard() {
  const [profileImage, setProfileImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const teacherName = ""; // Replace with fetched user data

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="btn btn-registerfrom d-md-none m-2"
        onClick={() => setSidebarOpen(true)}
      >
        ☰ Menu
      </button>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="overlay d-md-none"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="d-flex">
        {/* ====== SIDEBAR ====== */}
        <nav
          className={`sidebar registerform rounded-0 text-light p-3 ${
            sidebarOpen ? "open" : ""
          }`}
        >
          {/* CLOSE BUTTON FOR MOBILE */}
          <button
            className="btn btn-danger d-md-none mb-3"
            onClick={() => setSidebarOpen(false)}
          >
            ✕ Close
          </button>

          {/* Sidebar heading */}
          <div className="mb-4 text-center">
            <h4></h4>
          </div>

          {/* Sidebar links */}
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item mb-2">
              <a
                href="/teacher-dashboard"
                className="nav-link text-white"
                onClick={() => setSidebarOpen(false)}
              >
                Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/teacher-dashboard/profile"
                className="nav-link text-white"
                onClick={() => setSidebarOpen(false)}
              >
                Profile
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/teacher-dashboard/subjects"
                className="nav-link text-white"
                onClick={() => setSidebarOpen(false)}
              >
                Subjects
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/teacher-dashboard/results"
                className="nav-link text-white"
                onClick={() => setSidebarOpen(false)}
              >
                Results
              </a>
            </li>
          </ul>
        </nav>

        {/* ====== MAIN CONTENT ====== */}
        <main
          className={`flex-grow-1 p-4 main-content ${
            sidebarOpen ? "shifted" : ""
          }`}
        >
          <div className="container text-center">
            {/* Profile photo upload */}
            <div className="mb-4">
              <img
                src={profileImage || "/default-avatar.png"}
                alt="Profile"
                className="rounded-circle shadow"
                width="130"
                height="130"
                style={{ objectFit: "cover" }}
              />
            </div>

            <label className="btn btn-primary">
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            <h3 className="mt-3">{teacherName}</h3>

            <a href="/teacher-dashboard" className="btn btn-outline-dark mt-3">
              Go to Dashboard
            </a>

            <hr />

            <div>
              <h4>Welcome to your Teacher Dashboard</h4>
              <p>Use the sidebar to navigate through your tools.</p>
            </div>
          </div>
        </main>
      </div>

      {/* SIDEBAR & OVERLAY STYLES */}
      <style jsx>{`
        .sidebar {
          min-height: 100vh;
        }

        @media (max-width: 768px) {
          /* Sidebar hidden by default */
          .sidebar {
            position: fixed;
            top: 0;
            left: -260px;
            width: 240px;
            height: 100%;
            z-index: 2000;
            transition: left 0.3s ease;
          }

          .sidebar.open {
            left: 0; /* visible when open */
          }

          /* Overlay */
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1500;
          }

          /* Shift main content when sidebar is open */
          .main-content {
            transition: margin-left 0.3s ease;
          }

          .main-content.shifted {
            margin-left: 240px;
          }
        }
      `}</style>
    </>
  );
}
