"use client";

import { useEffect, useState } from "react";



export default function StudentProfile() {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    classLevel: "",
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load profile on mount
async function loadProfile() {
  try {
    const res = await fetch("/api/auth/student", {
      method: "GET",
      headers: {
        "x-username": localStorage.getItem("studentUsername"),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.error);
      return;
    }

    setProfile(data.user);
    if (data.user.photo) setPhoto(data.user.photo);

  } catch (err) {
    console.error(err);
  }
}


  // Handle photo preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Mock save (replace with API call)
  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      // Example: await fetch("/api/auth/student/update", {...})
      setTimeout(() => {
        setLoading(false);
        setMessage("Profile updated successfully!");
      }, 1000);
    } catch (err) {
      setLoading(false);
      setMessage("Failed to save profile.");
    }
  };

  return (
    <div className="container-fluid p-4 registerform text-light">
      <h2 className="mb-4">Student Profile</h2>

      {message && (
        <div className="alert alert-success">{message}</div>
      )}

      <div className="row g-4">
        {/* Profile Photo */}
        <div className="col-md-4 text-center">
          <img
            src={photo || "/default-avatar.png"}
            alt="Student Photo"
            className="img-fluid rounded-circle mb-3"
            style={{ width: "180px", height: "180px", objectFit: "cover", border: "3px solid #0d6efd" }}
          />
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handlePhotoChange}
          />
          <small className="text-muted d-block mt-1">
            Upload a clear passport-size photo
          </small>
        </div>

        {/* Profile Details */}
        <div className="col-md-8">
          <div className="card p-4 registerform text-light">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={profile.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Class Level</label>
              <input
                type="text"
                className="form-control"
                name="classLevel"
                value={profile.classLevel}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-green w-100"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
