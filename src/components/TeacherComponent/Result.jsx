"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";


export default function TeacherResults() {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    studentUsername: "",
    subjectName: "",
    score: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const resultsData = await fetchData("/api/results");
        const studentsData = await fetchData("/api/auth/student");
        const subjectsData = await fetchData("/api/subjects");

        setResults(resultsData.results || []);
        setStudents(studentsData.students || []);
        setSubjects(subjectsData.subjects || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.studentUsername || !formData.subjectName || !formData.score) {
      return alert("All fields are required");
    }

    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentUsername: formData.studentUsername,
          subjectName: formData.subjectName,
          score: parseInt(formData.score),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Result added/updated successfully!");
        setFormData({ studentUsername: "", subjectName: "", score: "" });
        const updatedResults = await fetchData("/api/results");
        setResults(updatedResults.results || []);
      } else {
        alert(data.error || "Failed to add result");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page-container">
      <h2>Student Results</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
        <select
          value={formData.studentUsername}
          onChange={(e) => setFormData({ ...formData, studentUsername: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s.username}>{s.name}</option>
          ))}
        </select>

        <select
          value={formData.subjectName}
          onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s._id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter score"
          value={formData.score}
          onChange={(e) => setFormData({ ...formData, score: e.target.value })}
        />

        <button type="submit">Add/Update Result</button>
      </form>

      <div className="card-grid">
        {results.map((res) => (
          <DashboardCard
            key={res._id}
            title={`${res.student} - ${res.subject}`}
            description={`Score: ${res.score} | Grade: ${res.grade}`}
            url="#"
          />
        ))}
      </div>
    </div>
  );
}
