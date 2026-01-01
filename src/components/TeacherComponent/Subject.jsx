"use client";

import { useState } from "react";

export default function TeacherSubjectsPage() {
  const [subjects, setSubjects] = useState([
    "Mathematics",
    "English",
    "Basic Science",
  ]);

  const [newSubject, setNewSubject] = useState("");

  const addSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() === "") return;

    setSubjects([...subjects, newSubject.trim()]);
    setNewSubject("");
  };

  const removeSubject = (subject) => {
    const updated = subjects.filter((item) => item !== subject);
    setSubjects(updated);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manage Subjects</h2>

      {/* Add Subject */}
      <div className="card p-4 shadow-sm mb-4">
        <h5>Add New Subject</h5>
        <form onSubmit={addSubject} className="d-flex mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button className="btn btn-primary ms-2">Add</button>
        </form>
      </div>

      {/* Subject List */}
      <div className="card p-4 shadow-sm">
        <h5>Subject List</h5>

        {subjects.length === 0 ? (
          <p className="mt-3 text-muted">No subjects added yet.</p>
        ) : (
          <ul className="list-group mt-3">
            {subjects.map((subj, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {subj}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeSubject(subj)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
