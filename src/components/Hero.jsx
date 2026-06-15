import { useFadeIn } from '../hooks/useFadeIn';

export default function Hero({ onRequestHelp }) {
  const ref = useFadeIn();

  return (
    <header id="hero">
      <div className="hero-content fade-in" ref={ref}>
        <h1>Stranded?<br /><span>We&apos;ve Got You Covered.</span></h1>
        <p>Get fast, reliable roadside assistance in under 15 minutes. Connect instantly with verified mechanics and towing services near you.</p>
        <button className="btn-primary" onClick={onRequestHelp}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Get Help Now
        </button>
      </div>
    </header>
  );
}
