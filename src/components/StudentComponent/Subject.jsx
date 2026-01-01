"use client";

import { useEffect, useState } from "react";
import SubjectCard from "@/components/SubjectCard";


export default function StudentSubjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await fetchData("/api/subjects");
        setSubjects(data.subjects || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadSubjects();
  }, []);

  return (
    <div className="page-container registerform text-light">
      <h2>Your Subjects</h2>
      <div className="card-grid">
        {subjects.map((sub) => (
          <SubjectCard key={sub._id} name={sub.name} description={sub.description} />
        ))}
      </div>
    </div>
  );
}
