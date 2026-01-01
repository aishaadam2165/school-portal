"use client";

export default function ViewModal({ data, onClose }) {
  if (!data) return null;

  const records = data.data || [];

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{data.title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {records.length === 0 ? (
              <p>No records found.</p>
            ) : (
              records.map((item) => (
                <div key={item._id} className="border rounded p-3 mb-3">
                  <p><strong>Name:</strong> {item.firstName} {item.surname}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                  {item.classLevel && <p><strong>Class:</strong> {item.classLevel}</p>}
                  {item.subject && <p><strong>Subject:</strong> {item.subject}</p>}
                  {item.email && <p><strong>Email:</strong> {item.email}</p>}
                  {item.phoneNumber && <p><strong>Phone:</strong> {item.phoneNumber}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
