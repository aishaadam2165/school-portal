"use client";

import { useEffect, useState } from "react";

export default function TeacherProfile() {
  const [teacher, setTeacher] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  // ===== Load teacher profile from API =====
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/teacher/profile");
        const data = await res.json();

        setTeacher(data.user || {});
        setProfileImage(data.user?.photoUrl || null);

      } catch (err) {
        console.error("PROFILE LOAD ERROR:", err);
      }
    }

    loadData();
  }, []);

const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Show preview instantly
  setProfileImage(URL.createObjectURL(file));

  const formData = new FormData();
  formData.append("file", file);
  formData.append("teacherId", teacher._id);

  try {
    const res = await fetch("/api/teacher/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.photoUrl) {
      setProfileImage(data.photoUrl); // Show Cloudinary image instantly
    }
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
  }
};


  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        {/* Profile Photo */}
        <div className="mb-3">
          <img
            src={profileImage || "/default-avatar.png"}
            alt="Profile"
            className="rounded-circle shadow"
            width="150"
            height="150"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Upload Button */}
        <label className="btn btn-primary">
          Change Photo
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </label>

        <h2 className="mt-3">{teacher.name || "Teacher Name"}</h2>
        <p className="text-muted">{teacher.email}</p>
      </div>

      <div className="card shadow-sm p-4">

        <h4 className="mb-4">Profile Details</h4>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="fw-bold">Full Name:</label>
            <p>{teacher.name}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">Email:</label>
            <p>{teacher.email}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">Phone Number:</label>
            <p>{teacher.phone || "N/A"}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">Section:</label>
            <p>{teacher.section || "Not Assigned"}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">Class Level:</label>
            <p>{teacher.classLevel || "Not Assigned"}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">Years of Experience:</label>
            <p>{teacher.experience || "N/A"}</p>
          </div>

          <div className="col-12">
            <label className="fw-bold">Address:</label>
            <p>{teacher.address || "N/A"}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
