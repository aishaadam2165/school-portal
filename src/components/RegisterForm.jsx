"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [state, setState] = useState("");
  const [lgaList, setLgaList] = useState([]);

  const [guardianState, setGuardianState] = useState("");
  const [guardianLgaList, setGuardianLgaList] = useState([]);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [availableClasses, setAvailableClasses] = useState([]);

  // Example Nigerian States + LGAs
  const statesAndLgas = {
    Lagos: ["Ikeja", "Surulere", "Epe", "Ikorodu"],
    Abuja: ["Gwagwalada", "Kwali", "Abaji", "Municipal"],
    Kano: ["Gwale", "Dala", "Kumbotso", "Tarauni"],
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);

    setLgaList(statesAndLgas[selectedState] || []);

    setFormData({ ...formData, state: selectedState, lga: "" });
  };

  const handleGuardianStateChange = (e) => {
    const selected = e.target.value;
    setGuardianState(selected);

    setGuardianLgaList(statesAndLgas[selected] || []);

    setFormData({ ...formData, guardianState: selected, guardianLga: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Registration failed");
      } else {
        setMessage("Registration successful!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <div className="card p-4 shadow-sm registerform w-100 text-light" style={{ maxWidth: "800px" }}>
        <h3 className="mb-4 text-light text-uppercase fw-bold text-center">
          Student Registration Form
        </h3>

        <form className="p-3" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <h5 className="fw-bold text-light mb-3">Personal Details</h5>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">First Name</label>
              <input type="text" name="firstName" className="form-control form-control-lg rounded-0 shadow-none" onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Surname</label>
              <input type="text" name="surname" className="form-control form-control-lg rounded-0" onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Other Name</label>
              <input type="text" name="otherName" className="form-control form-control-lg rounded-0" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Phone Number</label>
              <input type="tel" name="phoneNumber" className="form-control form-control-lg rounded-0" onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control form-control-lg rounded-0" onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Address</label>
              <input type="text" name="address" className="form-control form-control-lg rounded-0" onChange={handleChange} required />
            </div>
          </div>

          {/* State & LGA */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">State</label>
              <select name="state" className="form-select form-select-lg rounded-0" onChange={handleStateChange} required>
                <option value="">Select State</option>
                {Object.keys(statesAndLgas).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">LGA</label>
              <select name="lga" className="form-select form-select-lg rounded-0" value={formData.lga || ""} onChange={handleChange} required>
                <option value="">Select LGA</option>
                {lgaList.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Academic Details */}
          <h5 className="fw-bold text-light mt-4 mb-3">Academic Details</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Select Section</label>
              <select
                name="section"
                className="form-select form-select-lg rounded-0"
                onChange={(e) => {
                  const section = e.target.value;
                  setFormData({ ...formData, section, classLevel: "" });

                  let classes = [];

                  if (section === "Nursery & Primary") {
                    classes = [
                      "Nursery Setion",
                      "Free Nursery",
                      "Nursery 1",
                      "Nursery 2",
                      "Nursery 3",
                      "Primary Section",
                      "Primary 1",
                      "Primary 2",
                      "Primary 3",
                      "Primary 4",
                      "Primary 5",
                      "Primary 6",
                    ];
                  } else if (section === "Day Secondary School") {
                    classes = ["JSS 1", "JSS 2", "JSS 3"];
                  } else if (section === "High School") {
                    classes = ["SS 1", "SS 2", "SS 3"];
                  } else if (section === "Boarding School") {
                    classes = [
                      "Nursery Setion",
                      "Free Nursery",
                      "Nursery 1",
                      "Nursery 2",
                      "Nursery 3",
                      "Primary Section",
                      "Primary 1",
                      "Primary 2",
                      "Primary 3",
                      "Primary 4",
                      "Primary 5",
                      "Primary 6",
                      "Day Secondary Section",
                      "JSS 1",
                      "JSS 2",
                      "JSS 3",
                      "High school section",
                      "SS 1",
                      "SS 2",
                      "SS 3",
                    ];
                  }

                  setAvailableClasses(classes);
                }}
                required
              >
                <option value="">Select Section</option>
                <option value="Nursery & Primary">Nursery & Primary</option>
                <option value="Day Secondary School">Day Secondary School</option>
                <option value="High School">High School</option>
                <option value="Boarding School">Boarding School</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Select Class</label>
              <select
                name="classLevel"
                className="form-select form-select-lg rounded-0"
                value={formData.classLevel || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                {availableClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control form-control-lg rounded-0" onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Verify Password</label>
              <input
                type="password"
                name="verifyPassword"
                className="form-control form-control-lg rounded-0"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Guardian Details */}
          <h5 className="fw-bold text-light mt-4 mb-3">Guidance Details</h5>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Guardian Name</label>
              <input type="text" name="guardianName" className="form-control form-control-lg rounded-0" onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Surname</label>
              <input type="text" name="guardianSurname" className="form-control form-control-lg rounded-0" onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Other Name</label>
              <input type="text" name="guardianOtherName" className="form-control form-control-lg rounded-0" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Guardian Phone</label>
              <input type="tel" name="guardianPhone" className="form-control form-control-lg rounded-0" onChange={handleChange} required />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Guardian Email</label>
              <input type="email" name="guardianEmail" className="form-control form-control-lg rounded-0" onChange={handleChange} />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Guardian Address</label>
              <input type="text" name="guardianAddress" className="form-control form-control-lg rounded-0" onChange={handleChange} />
            </div>
          </div>

          {/* Guardian State & LGA */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">State</label>
              <select name="guardianState" className="form-select form-select-lg rounded-0" onChange={handleGuardianStateChange}>
                <option value="">Select State</option>
                {Object.keys(statesAndLgas).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">LGA</label>
              <select
                name="guardianLga"
                className="form-select form-select-lg rounded-0"
                value={formData.guardianLga || ""}
                onChange={handleChange}
              >
                <option value="">Select LGA</option>
                {guardianLgaList.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="alert alert-info mt-3" role="alert">
              {message}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="btn btn-outline-light btn-lg mt-3 w-100 rounded-0" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
