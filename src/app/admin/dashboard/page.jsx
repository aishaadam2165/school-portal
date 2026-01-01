"use client";

import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import StudentTable from "../components/StudentTable";
import TeacherTable from "../components/TeacherTable";
import ViewModal from "../components/ViewModal";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [activeView, setActiveView] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [sRes, tRes] = await Promise.all([
      fetch("/api/admin/students"),
      fetch("/api/admin/teachers"),
    ]);

    setStudents(await sRes.json());
    setTeachers(await tRes.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, type, status) => {
    await fetch("/api/admin/update-status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type, status }),
    });
    fetchData();
  };
  const approveStudent = async (id) => {
  await fetch("/api/students/approve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: id,
      notifyGuardian: true, // or false
    }),
  });

  alert("Student approved and notified");
};

const approveTeacher = async (id) => {
  await fetch("/api/teachers/approve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teacherId: id }),
  });

  alert("Teacher approved and notified");
};

const rejectTeacher = async (id) => {
  const reason = prompt("Reason for rejection (optional)");

  await fetch("/api/teachers/reject", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teacherId: id, reason }),
  });

  alert("Teacher rejected and notified");
};

  return (
    <>
      <h2 className="mb-4">Admin Dashboard</h2>

      {loading && <p>Loading...</p>}

      <div className="row mb-4">
        <StatCard
          title="Total Students"
          value={students.length}
          onView={() => setActiveView("students")}
        />

        <StatCard
          title="Total Teachers"
          value={teachers.length}
          onView={() => setActiveView("teachers")}
        />

        <StatCard
          title="Pending Requests"
          value={
            students.filter(s => s.status === "pending").length +
            teachers.filter(t => t.status === "pending").length
          }
          onView={() => setActiveView("pending")}
        />
      </div>

      {activeView === "students" && (
        <StudentTable
          students={students}
          onApprove={(id) => updateStatus(id, "student", "approved")}
          onReject={(id) => updateStatus(id, "student", "rejected")}
          view={setSelectedData}
        />
      )}

      {activeView === "teachers" && (
        <TeacherTable
          teachers={teachers}
          onApprove={(id) => updateStatus(id, "teacher", "approved")}
          onReject={(id) => updateStatus(id, "teacher", "rejected")}
          view={setSelectedData}
        />
      )}

      {activeView === "pending" && (
        <>
          <StudentTable
            students={students.filter(s => s.status === "pending")}
            onApprove={(id) => updateStatus(id, "student", "approved")}
            onReject={(id) => updateStatus(id, "student", "rejected")}
            view={setSelectedData}
          />

          <TeacherTable
            teachers={teachers.filter(t => t.status === "pending")}
            onApprove={(id) => updateStatus(id, "teacher", "approved")}
            onReject={(id) => updateStatus(id, "teacher", "rejected")}
            view={setSelectedData}
          />
        </>
      )}

      <ViewModal data={selectedData} onClose={() => setSelectedData(null)} />
    </>
  );
}
