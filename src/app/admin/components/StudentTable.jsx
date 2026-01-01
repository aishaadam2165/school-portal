"use client";

export default function StudentTable({ students, onApprove, onReject, view }) {
  return (
    <div className="card mb-4">
      <div className="card-header fw-bold">Student Registrations</div>

      <div className="card-body table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No students found
                </td>
              </tr>
            )}

            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.firstName} {s.surname}</td>
                <td>{s.classLevel}</td>

                <td>
                  <span
                    className={`badge bg-${
                      s.status === "approved"
                        ? "success"
                        : s.status === "rejected"
                        ? "danger"
                        : "warning"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-info btn-sm me-1"
                    onClick={() =>
                      view({
                        title: "Student Details",
                        data: [s],
                      })
                    }
                  >
                    View
                  </button>

                  {s.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={() => onApprove(s._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onReject(s._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
