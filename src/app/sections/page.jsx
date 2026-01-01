import Hero from "@/components/Hero";

const sections = [
  {
    name: "Nursery & Primary",
    url: "/sections/nursery-primary",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
  },
  {
    name: "Day Secondary",
    url: "/sections/day-secondary",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
  },
  {
    name: "High School",
    url: "/sections/high-school",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
  },
  {
    name: "Boarding",
    url: "/sections/boarding",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
];

export default function SectionsIndexPage() {
  return (
    <div className="page-container">
      <h1>School Sections</h1>
      <p>Explore the different sections of our school.</p>

      <div className="card-grid">
        {sections.map((section) => (
          <a key={section.name} href={section.url} className="card">
            <Hero title={section.name} imageUrl={section.image} />
            <p style={{ marginTop: "10px" }}>{section.name} Section</p>
          </a>
        ))}
      </div>
    </div>
  );
}
