"use client";

export default function TeacherTable({ teachers, onApprove, onReject, view }) {
  return (
    <div className="card mb-4">
      <div className="card-header fw-bold">Teacher Applications</div>

      <div className="card-body table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No teachers found
                </td>
              </tr>
            )}

            {teachers.map((t) => (
              <tr key={t._id}>
                <td>
                  {t.firstName} {t.surname}
                </td>
                <td>{t.subject}</td>

                <td>
                  <span
                    className={`badge bg-${
                      t.status === "approved"
                        ? "success"
                        : t.status === "rejected"
                        ? "danger"
                        : "warning"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-info btn-sm me-1"
                    onClick={() =>
                      view({
                        title: "Teacher Details",
                        data: [t],
                      })
                    }
                  >
                    View
                  </button>

                  {t.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => onApprove(t._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onReject(t._id)}
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
