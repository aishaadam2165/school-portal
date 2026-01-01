"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ApprovedTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch("/api/teachers/approved");
        const data = await res.json();
        setTeachers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch teachers error:", error);
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading approved teachers...</p>;
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Approved Teachers</h4>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Preferred Class</th>
            <th>Section</th>
            <th>Email</th>
            <th>Profile</th>
          </tr>
        </thead>

        <tbody>
          {teachers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No approved teachers found
              </td>
            </tr>
          ) : (
            teachers.map((t) => (
              <tr key={t._id}>
                <td>{t.firstName} {t.surname}</td>
                <td>{t.preferredClassLevel}</td>
                <td>{t.preferredSection}</td>
                <td>{t.email}</td>
                <td>
                  <Link
                    href={`/admin/teachers/${t._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
