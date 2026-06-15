import { useState } from 'react';

export default function Navbar({ onRequestHelp, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="site-nav">
      <a href="#" className="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18" /><path d="M3 18h18" /><path d="M3 6h18" />
          <circle cx="12" cy="12" r="3" fill="var(--primary-amber)" stroke="none" />
        </svg>
        RoadRescue
      </a>

      <div className={`nav-links${menuOpen ? ' active' : ''}`}>
        <a href="#services" onClick={handleLinkClick}>Services</a>
        <a href="#how-it-works" onClick={handleLinkClick}>How It Works</a>
        <a href="#providers" onClick={handleLinkClick}>Providers</a>
        <a href="#faq" onClick={handleLinkClick}>FAQ</a>
        
        <button
          onClick={toggleTheme}
          aria-label="Toggle light/dark theme"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-light)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.3s ease, transform 0.2s ease',
          }}
          className="theme-btn"
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-yellow)' }}>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-amber)' }}>
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>

        <button className="nav-cta" onClick={() => { handleLinkClick(); onRequestHelp(); }}>
          Request Help
        </button>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle navigation">
        <span /><span /><span />
      </button>
    </nav>
  );
}
