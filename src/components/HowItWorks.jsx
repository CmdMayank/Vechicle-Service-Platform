import { useEffect, useRef } from 'react';

const STEPS = [
  { num: '1', title: 'Breakdown Happens', desc: "You're stranded. Don't panic. Stay safe and open RoadRescue." },
  { num: '2', title: 'Share Location', desc: 'One tap pinpoints your exact GPS coordinates instantly.' },
  { num: '3', title: 'Match Provider', desc: 'We instantly alert the nearest trusted professional for your specific need.' },
  { num: '4', title: 'Help Arrives', desc: "Track your rescuer's ETA in real time until they reach your vehicle." },
];

export default function HowItWorks() {
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
    <section id="how-it-works" className="rr-section how-it-works-section" ref={containerRef}>
      <div className="section-header fade-in">
        <h2 className="section-title">How It <span>Works</span></h2>
        <p className="section-subtitle">A seamless, stress-free process designed to rescue you efficiently when the unexpected happens.</p>
      </div>
      <div className="steps-container">
        {STEPS.map((s) => (
          <div key={s.num} className="step fade-in">
            <div className="step-number">{s.num}</div>
            <h4 className="step-title">{s.title}</h4>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
