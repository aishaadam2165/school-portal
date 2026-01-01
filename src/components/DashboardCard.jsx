import React from "react";

export default function DashboardCard({ title, description, url }) {
  return (
    <a href={url} className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
}
