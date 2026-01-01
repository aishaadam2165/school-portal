"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // ✅ ADD THIS

export default function ApprovedStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch("/api/students/approved");
      const data = await res.json();
      setStudents(data);
      setLoading(false);
    }
    fetchStudents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th> {/* ✅ NEW COLUMN */}
        </tr>
      </thead>

      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan="4">No approved students found</td>
          </tr>
        ) : (
          students.map((s) => (
            <tr key={s._id}>
              <td>{s.firstName} {s.surname}</td>
              <td>{s.email}</td>
              <td>{s.status}</td>

              {/* ✅ VIEW PROFILE BUTTON */}
              <td>
                <Link href={`/admin/students/${s._id}`}>
                  View Profile
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
