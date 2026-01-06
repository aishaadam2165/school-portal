export default function ResultPortal() {
  return (
    <div className="page-container">
      <h1>Student Result Portal</h1>
      <p>
        Access your academic results using your login credentials. Students must
        be logged in to view detailed performance reports.
      </p>

      <div className="box">
        <h2>Login to Access Results</h2>
        <form className="simple-form">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
