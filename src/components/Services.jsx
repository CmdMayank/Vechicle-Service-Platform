import { useEffect, useRef } from 'react';

const SERVICES = [
  {
    title: 'Tyre Change',
    desc: "Got a flat? We'll mount your spare or patch your tyre on the spot so you can keep moving safely.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="8" /><line x1="12" y1="16" x2="12" y2="22" />
        <line x1="2" y1="12" x2="8" y2="12" /><line x1="16" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    title: 'Battery Jump-Start',
    desc: 'Dead battery? Our responders carry heavy-duty jump boxes to get your engine roaring again instantly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Fuel Delivery',
    desc: "Running on empty? We'll deliver enough fuel directly to your location to get you to the nearest station.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 22v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8" />
        <path d="M3 22h8" />
        <path d="M11 5v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2z" />
        <path d="M19 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      </svg>
    ),
  },
  {
    title: 'Towing',
    desc: 'Severe breakdown or accident? Our network of flatbeds and wreckers are on standby 24/7 to tow you safely.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 16h-2v-4h2v4z" /><path d="M3 12h18v4H3v-4z" /><path d="M7 12V8h6l4 4" />
        <circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
        <path d="M11 8l4-4" /><path d="M15 4h3v4" />
      </svg>
    ),
  },
  {
    title: 'Mechanic On-Site',
    desc: 'Minor engine trouble? A verified mobile mechanic will diagnose and fix simple issues right where you are parked.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: 'Lockout Rescue',
    desc: "Keys locked inside? Fast, non-destructive entry methods to get you back in the driver's seat safely.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
  },
];

export default function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cards.forEach((c) => observer.observe(c));
    return () => cards.forEach((c) => observer.unobserve(c));
  }, []);

  return (
    <section id="services" className="rr-section" ref={containerRef}>
      <div className="section-header fade-in">
        <h2 className="section-title">Emergency <span>Services</span></h2>
        <p className="section-subtitle">Whatever the issue, we have the right professional ready to deploy to your exact location.</p>
      </div>
      <div className="services-grid">
        {SERVICES.map((s) => (
          <div key={s.title} className="service-card fade-in">
            <div className="service-icon">{s.icon}</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
