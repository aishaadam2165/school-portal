"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TeacherProfilePage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeacher() {
      const res = await fetch(`/api/teachers/${id}`);
      const data = await res.json();
      setTeacher(data);
      setLoading(false);
    }
    if (id) fetchTeacher();
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (!teacher) return <p>Teacher not found</p>;

  return (
    <div className="container">
      <h2>Teacher Profile</h2>

      <p><strong>Name:</strong> {teacher.firstName} {teacher.surname}</p>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Phone:</strong> {teacher.phone}</p>
      <p><strong>Qualification:</strong> {teacher.qualification}</p>
      <p><strong>Experience:</strong> {teacher.experience} years</p>
      <p><strong>Status:</strong> {teacher.status}</p>
    </div>
  );
}
