"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StudentProfilePage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      const res = await fetch(`/api/students/${id}`);
      const data = await res.json();
      setStudent(data);
      setLoading(false);
    }
    if (id) fetchStudent();
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (!student) return <p>Student not found</p>;

  return (
    <div className="container">
      <h2>Student Profile</h2>

      <p><strong>Name:</strong> {student.firstName} {student.surname}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phoneNumber}</p>
      <p><strong>Class:</strong> {student.classLevel}</p>
      <p><strong>Section:</strong> {student.section}</p>
      <p><strong>Status:</strong> {student.status}</p>

      <hr />

      <h4>Guardian Information</h4>
      <p>{student.guardianName} {student.guardianSurname}</p>
      <p>{student.guardianPhone}</p>
    </div>
  );
}
