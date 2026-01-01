"use client";

export default function StatCard({ title, value, onView }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h6 className="text-muted">{title}</h6>
            <h3 className="fw-bold">{value}</h3>
          </div>

          <button
            className="btn btn-sm btn-outline-primary mt-3"
            onClick={onView}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
