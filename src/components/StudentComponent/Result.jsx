"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";


export default function StudentResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function loadResults() {
      try {
        const data = await fetchData("/api/results");
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadResults();
  }, []);

  return (
    <div className="page-container registerform text-light">
      <h2>Your Results</h2>
      <div className="card-grid">
        {results.map((res) => (
          <DashboardCard
            key={res._id}
            title={res.subject}
            description={`Score: ${res.score} | Grade: ${res.grade}`}
            url="#"
          />
        ))}
      </div>
    </div>
  );
}
