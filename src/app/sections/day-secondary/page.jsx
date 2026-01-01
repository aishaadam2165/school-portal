export default function DaySecondaryPage() {
  return (
    <div className="page-container">

      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1588072432836-e10032774350"
          alt="Day Secondary School"
        />
        <div className="hero-overlay">
          <h1>Day Secondary Section</h1>
        </div>
      </div>

      <p>
        The Day Secondary section delivers a balanced academic programme for
        junior and senior secondary students, focusing on strong fundamentals,
        critical thinking and character development.
      </p>

      <section className="section">
        <h2>Curriculum</h2>
        <p>
          National curriculum subjects complemented by debate, STEM clubs,
          creative arts, and sports.
        </p>
      </section>

      <section className="section">
        <h2>Support & Assessment</h2>
        <p>
          Regular assessments, mentoring and exam preparation to help students
          reach their academic potential.
        </p>
      </section>

      <div className="box">
        <h3>Resources</h3>
        <p>
          Explore <a href="/academics">Academics</a> or check results through the
          <a href="/result-portal"> Result Portal</a>.
        </p>
      </div>
    </div>
  );
}
