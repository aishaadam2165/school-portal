import React from "react";

export default function SubjectCard({ name, description }) {
  return (
    <div className="card subject-card">
      <h3>{name}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
