export default function NurseryPrimaryPage() {
  return (
    <div className="page-container">

      <div className="hero">
        <img
          src="logo.jpg"
          alt="Nursery and Primary Section"
        />
        <div className="hero-overlay">
          <h1>Nursery & Primary Section</h1>
        </div>
      </div>

      <p>
        Our Nursery & Primary programme focuses on early childhood development,
        building literacy, numeracy and social skills in a safe and caring
        environment.
      </p>

      <section className="section">
        <h2>Early Years Curriculum</h2>
        <p>
          A play-based and discovery-led curriculum encouraging curiosity,
          language development and foundational numeracy.
        </p>
      </section>

      <section className="section">
        <h2>Facilities & Care</h2>
        <ul style={{ maxWidth: 700, margin: "12px auto" }}>
          <li>Bright, child-safe classrooms</li>
          <li>Age-appropriate play areas</li>
          <li>Qualified early-years teachers</li>
          <li>Regular parent-teacher engagements</li>
        </ul>
      </section>

      <div className="box">
        <h3>Admissions</h3>
        <p>
          Children aged 3–11 are eligible.  
          <a href="/admission-process">Learn about admissions</a>.
        </p>
      </div>
    </div>
  );
}
