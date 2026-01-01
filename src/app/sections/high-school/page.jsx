export default function HighSchoolPage() {
  return (
    <div className="page-container">

      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
          alt="High School"
        />
        <div className="hero-overlay">
          <h1>High School</h1>
        </div>
      </div>

      <p>
        Our High School prepares students for external examinations and tertiary
        education with advanced subject options, career guidance and university
        preparation.
      </p>

      <section className="section">
        <h2>Subject Streams</h2>
        <ul style={{ maxWidth: 700, margin: "12px auto" }}>
          <li>Science — Physics, Chemistry, Biology</li>
          <li>Mathematics & Further Mathematics</li>
          <li>Arts — Literature, History, Government</li>
          <li>Commercial — Economics, Accounting, Business Studies</li>
        </ul>
      </section>

      <section className="section">
        <h2>University Preparation</h2>
        <p>
          We provide counselling, guidance, application support and seminars
          to help students transition into higher institutions.
        </p>
      </section>

      <div className="box">
        <h3>Exam Information</h3>
        <p>
          Visit the <a href="/result-portal">Result Portal</a> for exam results.
        </p>
      </div>
    </div>
  );
}
