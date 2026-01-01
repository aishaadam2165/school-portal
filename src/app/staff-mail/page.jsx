export default function StaffMail() {
  return (
    <div className="page-container">
      <h1>Staff Mail</h1>
      <p>
        This portal provides secure access to staff email and communication
        tools. Only authorized staff members can log in.
      </p>

      <div className="box">
        <h2>Staff Login</h2>
        <form className="simple-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter password" />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
