export default function BlogPage() {
  return (
    <div className="page-container">
      <h1>School Blog</h1>
      <p>
        Stay updated with school news, announcements, achievements, and upcoming
        events.
      </p>

      <div className="blog-list">
        <div className="blog-post">
          <h2>Welcome Back to a New Term</h2>
          <p>
            A fresh term begins with excitement as students and teachers return
            to school. Here is what to expect this session...
          </p>
          <a href="#">Read More</a>
        </div>

        <div className="blog-post">
          <h2>Inter-House Sports Competition</h2>
          <p>
            Our annual sports competition brings energy and unity across all
            houses. Check out highlights and winners...
          </p>
          <a href="#">Read More</a>
        </div>

        <div className="blog-post">
          <h2>New ICT Laboratory Unveiled</h2>
          <p>
            We are excited to announce a fully equipped new ICT lab for both
            junior and senior classes...
          </p>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
  );
}
