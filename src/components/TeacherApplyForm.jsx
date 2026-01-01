"use client";

import { useState } from "react";

export default function TeacherApplyForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/teacher-apply", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    alert(data.message || data.error);
  };

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <div className="card p-4 shadow-sm registerform w-100 text-light" style={{ maxWidth: "800px" }}>
        <div className="">
          <h4 className="mb-4 text-light text-uppercase fw-bold text-center">Teacher Application Form</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            {/* --- Personal Information --- */}
            <h5 className="mb-3">Personal Information</h5>
            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label">First Name</label>
                <input type="text" name="firstName" required className="form-control rounded-0" />
              </div>

              <div className="col-md-4">
                <label className="form-label">Surname</label>
                <input type="text" name="surname" required className="form-control rounded-0" />
              </div>

              <div className="col-md-4">
                <label className="form-label">Other Name</label>
                <input type="text" name="otherName" className="form-control rounded-0" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input type="tel" name="phone" required className="form-control rounded-0 " />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" name="email" required className="form-control rounded-0" />
              </div>

              <div className="col-12">
                <label className="form-label">Home Address</label>
                <input type="text" name="address" required className="form-control rounded-0" />
              </div>

              <div className="col-md-6">
                <label className="form-label">State</label>
                <input type="text" name="state" required className="form-control rounded-0" />
              </div>

              <div className="col-md-6">
                <label className="form-label">LGA</label>
                <input type="text" name="lga" required className="form-control rounded-0" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input type="date" name="dob" required className="form-control rounded-0" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select name="gender" required className="form-select rounded-0">
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <hr className="my-4" />

            {/* --- Professional Information --- */}
            <h5 className="mb-3">Professional Information</h5>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Highest Qualification</label>
                <input type="text" name="qualification" required className="form-control rounded-0" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Years of Experience</label>
                <input type="number" name="experience" required className="form-control rounded-0" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Preferred Section</label>
                <select name="preferredSection" required className="form-select rounded-0 shadow-none">
                  <option value="">Select section</option>
                  <option>Nursery</option>
                  <option>Primary</option>
                  <option>Secondary</option>
                  <option>High School</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Preferred Class Level</label>
                <select name="preferredClassLevel" required className="form-select rounded-0">
                  <option value="">Select class level</option>
                  <option>Early Grade</option>
                  <option>Middle Grade</option>
                  <option>Upper Grade</option>
                  <option>Senior Level</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Upload Resume (PDF)</label>
                <input type="file" name="resume" accept=".pdf" required className="form-control rounded-0" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Upload Photo</label>
                <input type="file" name="photo" accept="image/*" required className="form-control rounded-0" />
              </div>

            </div>

            <hr className="my-4" />

            {/* --- Account Information --- */}
            <h5 className="mb-3">Account Creation</h5>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" name="password" required className="form-control rounded-0" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <input type="password" name="confirmPassword" required className="form-control rounded-0" />
              </div>

            </div>

            <div className="mt-4">
              <button disabled={loading} className="btn btn-outline-light w-100 py-2 rounded-0">
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
