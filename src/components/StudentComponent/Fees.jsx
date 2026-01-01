"use client";

import { useState, useEffect } from "react"; // ✅ import useState
import DashboardCard from "@/components/DashboardCard";

export default function StudentFees() {
  const [fees, setFees] = useState([]);
  const [payAmount, setPayAmount] = useState("");

  // Load fees from API
  async function loadFees() {
    try {
      const res = await fetch("/api/fees");
      const data = await res.json();
      setFees(data.fees || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadFees();
  }, []);

  // Handle fee payment
  async function handlePay(studentUsername) {
    if (!payAmount) return alert("Enter amount to pay");

    try {
      const res = await fetch("/api/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentUsername, amount: parseInt(payAmount) }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Payment successful!");
        setPayAmount("");
        loadFees();
      } else {
        alert(data.error || "Payment failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page-container registerform text-light">
      <h2>Your Fees</h2>
      <div className="card-grid">
        {fees.map((fee) => (
          <div key={fee._id} className="dashboard-card">
            <p><strong>Student:</strong> {fee.student}</p>
            <p><strong>Amount:</strong> ₦{fee.total}</p>
            <p><strong>Paid:</strong> {fee.paid ? "Yes" : "No"}</p>

            {!fee.paid && (
              <div>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                />
                <button onClick={() => handlePay(fee.student)}>Pay Now</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
