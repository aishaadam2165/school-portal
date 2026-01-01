export default function Sidebar() {
  return (
    <aside
      className="registerform text-white p-3 vh-100"
      style={{ width: "250px" }}
    >
      <h4 className="text-center">Admin Panel</h4>
      <hr />
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="/admin/dashboard" className="nav-link text-white">
            Dashboard
          </a>
          <a href="/admin/students/approved" className="nav-link text-white">
            Students
          </a>
          <a href="/admin/teachers/approved" className="nav-link text-white">
            Teachers
          </a>
        </li>
      </ul>
    </aside>
  );
}
