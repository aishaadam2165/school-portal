export default function ItSupport() {
  return (
    <div className="page-container">
      <h1>IT Support</h1>
      <p>
        Having issues accessing your account or navigating the school portal?
        Our IT team is ready to help.
      </p>

      <div className="box">
        <h2>Submit a Support Request</h2>
        <form className="simple-form">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" />

          <label>Issue Description</label>
          <textarea placeholder="Describe the problem"></textarea>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
