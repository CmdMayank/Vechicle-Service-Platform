import { useState, useEffect, useRef } from 'react';

const FAQ_DATA = [
  {
    q: 'How fast will help arrive?',
    a: 'Typically under 15 minutes! Because we connect you directly with nearby available providers via live GPS matching, response times are significantly faster than traditional dispatch networks.',
  },
  {
    q: 'Is RoadRescue available 24/7?',
    a: 'Yes, absolutely. We maintain a robust network of night-shift mechanics and emergency towing services who are on call 24 hours a day, 7 days a week, including holidays.',
  },
  {
    q: 'How do I pay for the service?',
    a: 'All payments are handled securely through the platform using credit/debit card or mobile wallets. You only pay after the service has been successfully completed, and pricing is transparently shown upfront.',
  },
  {
    q: 'Are the providers trustworthy?',
    a: 'Every professional on our network undergoes a strict vetting process, including background checks, license verification, and continuous monitoring of their ratings and response times.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(-1);
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
    <section id="faq" className="rr-section faq-section" ref={containerRef}>
      <div className="section-header fade-in">
        <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
        <p className="section-subtitle">Everything you need to know about our rescue services and response times.</p>
      </div>
      <div className="faq-container fade-in">
        {FAQ_DATA.map((item, i) => (
          <div key={i} className={`faq-item${activeIndex === i ? ' active' : ''}`}>
            <div className="faq-question" onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}>
              {item.q}
              <svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
