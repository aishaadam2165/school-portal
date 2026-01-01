export default function Hero({ title, imageUrl }) {
  return (
    <div className="hero">
      <img src={imageUrl} alt={title} />
      <div className="hero-overlay">
        <h1>{title}</h1>
      </div>
    </div>
  );
}
