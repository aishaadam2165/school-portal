export default function BoardingPage() {
  return (
    <div className="page-container">

      <div className="hero">
        <img
          src="/logo.jgp"
          alt="Boarding School"
        />
        <div className="hero-overlay">
          <h1>Boarding Section</h1>
        </div>
      </div>

      <p>
        Our boarding programme offers a secure, supportive residential
        environment that complements academics while teaching independence and
        responsibility.
      </p>

      <section className="section">
        <h2>Residential Life</h2>
        <p>
          Comfortable dorms, supervised study times, sports activities, and
          experienced house parents ensure students thrive.
        </p>
      </section>

      <section className="section">
        <h2>Wellbeing & Routine</h2>
        <p>
          Structured routines, nutritious meals, routine checks, and pastoral
          care are provided throughout the school year.
        </p>
      </section>

      <div className="box">
        <h3>Boarding Application</h3>
        <p>
          Boarding spaces are limited.  
          Visit <a href="/admission-process">Admissions</a> for more info.
        </p>
      </div>
    </div>
  );
}
