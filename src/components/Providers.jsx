import { useState, useEffect, useRef, useCallback } from 'react';

const PROVIDERS_DATA = [
  {
    id: 1, initials: 'M', name: "Mike's Auto Repair", specialty: 'Mobile Mechanic',
    rating: '4.9', reviews: 120, distance: '2.4', type: 'mechanics',
    phone: '(555) 019-2831', eta: 12, bg: '#2a2a3e',
  },
  {
    id: 2, initials: 'QT', name: 'QuickTow Services', specialty: 'Flatbed & Wrecker',
    rating: '4.8', reviews: 85, distance: '3.1', type: 'towing',
    phone: '(555) 982-1102', eta: 15, bg: '#1a365d',
  },
  {
    id: 3, initials: 'CB', name: 'City Battery & Lock', specialty: 'Jump-start & Locksmith',
    rating: '5.0', reviews: 42, distance: '1.8', type: 'emergency',
    phone: '(555) 334-9988', eta: 9, bg: '#5d1a1a',
  },
  {
    id: 4, initials: 'DT', name: 'Dave The Mechanic', specialty: 'Engine & Transmission',
    rating: '4.7', reviews: 200, distance: '4.5', type: 'mechanics',
    phone: '(555) 771-4456', eta: 22, bg: '#1a5d2c',
  },
];

const FILTERS = [
  { label: 'All Providers', value: 'all' },
  { label: 'Mechanics', value: 'mechanics' },
  { label: 'Towing Services', value: 'towing' },
  { label: 'Emergency / SOS', value: 'emergency' },
];

const VerifiedBadge = () => (
  <svg className="verified-badge" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 3.09L19.5 5.5l-.41 4.41L22 12l-2.91 2.09.41 4.41-4.41-.41L12 22l-3.09-3.09L4.5 18.5l.41-4.41L2 12l2.91-2.09-.41-4.41 4.41.41L12 2z" />
  </svg>
);

const StarIcon = () => (
  <svg className="star-icon" width="16" height="16" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

function ProviderCard({ provider }) {
  const [expanded, setExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(provider.eta * 60);
  const intervalRef = useRef(null);

  const toggle = useCallback((e) => {
    if (e.target.closest('.contact-btn')) return;
    setExpanded((v) => !v);
  }, []);

  useEffect(() => {
    if (expanded) {
      setTimeLeft(provider.eta * 60);
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearInterval(intervalRef.current); return 0; }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [expanded, provider.eta]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerDisplay = timeLeft === 0
    ? 'Arriving!'
    : `${mins < 10 ? '0' + mins : mins}m ${secs < 10 ? '0' + secs : secs}s`;

  return (
    <div className="provider-card fade-in" onClick={toggle}>
      <div className="provider-header">
        <div className="provider-avatar" style={{ background: provider.bg }}>
          {provider.initials}
          <div className="online-dot" />
        </div>
        <div className="provider-info">
          <h4>{provider.name} <VerifiedBadge /></h4>
          <div className="specialty">{provider.specialty}</div>
        </div>
      </div>
      <div className="provider-stats">
        <span><StarIcon /> {provider.rating} ({provider.reviews} reviews)</span>
        <span>📍 {provider.distance} miles away</span>
      </div>
      <div className={`expand-panel${expanded ? ' expanded' : ''}`}>
        <div className="eta-box">
          <span className="eta-text">Estimated Arrival</span>
          <span className="timer" style={timeLeft === 0 ? { color: 'var(--success)' } : {}}>{timerDisplay}</span>
        </div>
        <button className="contact-btn">📞 Connect: {provider.phone}</button>
      </div>
    </div>
  );
}

export default function Providers() {
  const [filter, setFilter] = useState('all');
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
  }, [filter]);

  const visibleProviders = filter === 'all'
    ? PROVIDERS_DATA
    : PROVIDERS_DATA.filter((p) => p.type === filter);

  return (
    <section id="providers" className="rr-section" ref={containerRef}>
      <div className="section-header fade-in">
        <h2 className="section-title">Live <span>Provider</span> Finder</h2>
        <p className="section-subtitle">Real-time view of trusted professionals currently patrolling your area.</p>
      </div>
      <div className="filter-tabs fade-in">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-btn${filter === f.value ? ' active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="providers-grid">
        {visibleProviders.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </section>
  );
}
