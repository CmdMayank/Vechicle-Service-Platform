import { useEffect, useRef, useState } from 'react';

function Counter({ target, suffix = '', prefix = '' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const duration = 2000;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.ceil(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }
    });

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats">
      <div className="stat-item">
        <div className="stat-number">
          <Counter target={10000} suffix="+" />
        </div>
        <div className="stat-label">Successful Rescues</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">
          <Counter target={15} prefix="< " suffix="m" />
        </div>
        <div className="stat-label">Avg. Response Time</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">
          <Counter target={500} suffix="+" />
        </div>
        <div className="stat-label">Verified Providers</div>
      </div>
    </section>
  );
}
