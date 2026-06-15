import { useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    text: 'I was stranded at 2 AM with a blown-out tyre on a dark highway. A verified mechanic arrived in 12 minutes! Absolute lifesavers.',
    name: 'Sarah Jenkins', initials: 'SJ',
  },
  {
    text: 'The battery died in the middle of nowhere during a family road trip. The app matched us immediately. Highly recommend to everyone.',
    name: 'Mark Torres', initials: 'MT',
  },
  {
    text: "Locked my keys in the car with the engine running. The locksmith dispatched by RoadRescue was incredibly fast, friendly, and fairly priced.",
    name: 'Emily Richards', initials: 'ER',
  },
];

const Star = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Testimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    items.forEach((i) => observer.observe(i));
    return () => items.forEach((i) => observer.unobserve(i));
  }, []);

  return (
    <section id="testimonials" className="rr-section testimonials-section" ref={containerRef}>
      <div className="section-header fade-in">
        <h2 className="section-title">Saved By <span>RoadRescue</span></h2>
        <p className="section-subtitle">Don&apos;t just take our word for it. Hear from drivers we&apos;ve helped get back on the road safely.</p>
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="test-card fade-in">
            <div className="quote-icon">&ldquo;</div>
            <div className="stars">
              {[...Array(5)].map((_, i) => <Star key={i} />)}
            </div>
            <p className="test-text">{t.text}</p>
            <div className="test-author">
              <div className="test-author-avatar">{t.initials}</div>
              <div>
                <h5>{t.name}</h5>
                <span>Verified User</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
