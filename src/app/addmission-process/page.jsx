export default function AdmissionProcessPage() {
  return (
    <div className="section">
      <h1>Admission Process</h1>
      <p>
        We welcome learners from diverse backgrounds into our school community.
        Our admission process is simple and transparent.
      </p>

      <h2>How to Apply</h2>
      <ol style={{ maxWidth: "650px", margin: "20px auto" }}>
        <li>Pick up or download the admission form.</li>
        <li>Fill in accurate student and parent details.</li>
        <li>Submit the form along with required documents.</li>
        <li>Schedule and take the entrance assessment (where applicable).</li>
        <li>Receive admission confirmation and complete registration.</li>
      </ol>

      <h2>Requirements</h2>
      <ul style={{ maxWidth: "650px", margin: "20px auto" }}>
        <li>Birth Certificate</li>
        <li>Previous School Results (for transfers)</li>
        <li>Passport Photograph</li>
        <li>Medical Report (optional for some classes)</li>
      </ul>

      <p>
        For more inquiries, please contact the school administration or visit
        our help center.
      </p>
    </div>
  );
}
