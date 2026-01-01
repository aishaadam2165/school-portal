"use client";

import Navbar from "../components/Navbar";
import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div className="d-flex flex-grow-1">
        <Sidebar />

        <main className="flex-grow-1 p-4 overflow-auto bg-light">
          {children}
        </main>
      </div>
    </div>
  );
}
