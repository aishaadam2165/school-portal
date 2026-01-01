// app/(auth)/login/page.jsx or components/LoginForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default to student or change to teacher as you prefer
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          password,
          role,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Optionally store token/session info here if your API returns it.
      // Redirect based on role
      if (role === "teacher") {
        router.push("/teacher-dashboard");
      } else {
        router.push("/student-dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setLoading(false);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card p-4 shadow-lg w-100 text-light registerform"
        style={{ maxWidth: "450px" }}
      >
        <h3 className="mb-4 text-light text-uppercase fw-bold text-center">
          Login
        </h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleLogin} className="p-3 text-start">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control form-control-lg shadow-none"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Role</label>
            <select
              className="form-control form-control-lg"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-control-lg shadow-none"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "55px",
                fontSize: "1.3rem",
                cursor: "pointer",
                color: "#bbb",
              }}
            ></i>
          </div>

          <button
            type="submit"
            className="btn btn-outline-light rounded-0 btn-lg w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
