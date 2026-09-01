import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './RoadScene.css';

/* ====================================================
   TowTruckSVG — Detailed, high-fidelity inline SVG
   ==================================================== */
function TowTruckSVG() {
  return (
    <svg
      width="320"
      height="140"
      viewBox="0 0 320 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Rescue Tow Truck"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3a5c" />
          <stop offset="100%" stopColor="#1a2a44" />
        </linearGradient>
        <linearGradient id="cabGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334d7a" />
          <stop offset="100%" stopColor="#1e3356" />
        </linearGradient>
        <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a7ab5" />
          <stop offset="40%" stopColor="#1e3356" />
          <stop offset="100%" stopColor="#0f1a2e" />
        </linearGradient>
        <linearGradient id="bedGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#222e42" />
          <stop offset="100%" stopColor="#1a2438" />
        </linearGradient>
        <linearGradient id="boomGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#556688" />
          <stop offset="100%" stopColor="#3d5070" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="headlightGlow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>


      {/* ---- Flatbed / Tow bed ---- */}
      <rect x="30" y="72" width="170" height="12" rx="2" fill="url(#bedGrad)" stroke="#3a4a66" strokeWidth="0.5" />
      {/* Bed rails */}
      <rect x="32" y="70" width="4" height="14" rx="1" fill="#3d5070" />
      <rect x="80" y="70" width="4" height="14" rx="1" fill="#3d5070" />
      <rect x="130" y="70" width="4" height="14" rx="1" fill="#3d5070" />
      <rect x="180" y="70" width="4" height="14" rx="1" fill="#3d5070" />
      {/* Bed surface texture lines */}
      <line x1="40" y1="76" x2="190" y2="76" stroke="#2a3a55" strokeWidth="0.5" />
      <line x1="40" y1="79" x2="190" y2="79" stroke="#2a3a55" strokeWidth="0.5" />

      {/* ---- Truck body (main cab) ---- */}
      <path
        d="M185 84 L185 38 Q185 34 189 34 L250 34 Q258 34 262 42 L280 72 Q282 76 280 80 L280 84 Z"
        fill="url(#cabGrad)"
        stroke="#4a6090"
        strokeWidth="0.8"
      />

      {/* Cab panel lines */}
      <line x1="200" y1="38" x2="200" y2="84" stroke="#2a4060" strokeWidth="0.5" />

      {/* Windshield */}
      <path
        d="M210 40 L248 40 Q254 40 258 48 L272 72 L210 72 Z"
        fill="url(#windowGrad)"
        stroke="#5580aa"
        strokeWidth="0.5"
        opacity="0.9"
      />
      {/* Windshield reflection */}
      <path
        d="M220 44 L240 44 Q244 44 247 50 L256 66 L220 66 Z"
        fill="rgba(100,160,220,0.12)"
      />

      {/* Side window */}
      <rect x="190" y="42" width="14" height="26" rx="2" fill="url(#windowGrad)" stroke="#5580aa" strokeWidth="0.5" opacity="0.8" />

      {/* Door handle */}
      <rect x="192" y="60" width="8" height="2" rx="1" fill="#5580aa" />

      {/* ---- Bumper ---- */}
      <rect x="276" y="76" width="14" height="10" rx="2" fill="#2a3a55" stroke="#3a4a66" strokeWidth="0.5" />

      {/* ---- Headlight ---- */}
      <rect x="282" y="64" width="8" height="8" rx="2" fill="#fff5d0" filter="url(#headlightGlow)" opacity="0.9" />
      <rect x="283" y="65" width="6" height="6" rx="1.5" fill="#ffffee" />

      {/* ---- Tail light ---- */}
      <rect x="30" y="76" width="6" height="6" rx="1" fill="#ff3333" opacity="0.8" />

      {/* ---- Hydraulic boom/crane ---- */}
      {/* Base mount */}
      <rect x="155" y="52" width="20" height="22" rx="3" fill="#2a3a55" stroke="#3d5070" strokeWidth="0.8" />
      {/* Main boom arm */}
      <rect x="100" y="22" width="80" height="8" rx="3" fill="url(#boomGrad)" stroke="#6680aa" strokeWidth="0.5" transform="rotate(-15 160 26)" />
      {/* Boom piston */}
      <rect x="135" y="42" width="6" height="25" rx="2" fill="#556688" stroke="#6680aa" strokeWidth="0.5" transform="rotate(10 138 55)" />
      {/* Cable winch housing */}
      <circle cx="165" cy="60" r="6" fill="#3d5070" stroke="#5580aa" strokeWidth="0.5" />
      <circle cx="165" cy="60" r="3" fill="#2a3a55" />
      {/* Cable line */}
      <line x1="105" y1="18" x2="105" y2="70" stroke="#7799bb" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
      {/* Hook */}
      <path d="M103 65 Q100 72 105 72 Q110 72 107 65" stroke="#FFB347" strokeWidth="1.5" fill="none" />

      {/* ---- Undercarriage ---- */}
      <rect x="40" y="84" width="250" height="8" rx="2" fill="#1a2438" stroke="#2a3a55" strokeWidth="0.5" />

      {/* ---- Mudguards ---- */}
      <path d="M52 92 Q72 80 92 92" fill="#1a2438" stroke="#2a3a55" strokeWidth="0.5" />
      <path d="M232 92 Q252 80 272 92" fill="#1a2438" stroke="#2a3a55" strokeWidth="0.5" />

      {/* ---- Front Wheel ---- */}
      <g className="wheel-spin" style={{ transformOrigin: '252px 100px' }}>
        <circle cx="252" cy="100" r="18" fill="#111" stroke="#333" strokeWidth="1.5" />
        <circle cx="252" cy="100" r="14" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <circle cx="252" cy="100" r="6" fill="#333" />
        <circle cx="252" cy="100" r="3" fill="#555" />
        {/* Wheel spokes */}
        <line x1="252" y1="86" x2="252" y2="114" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="238" y1="100" x2="266" y2="100" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="241" y1="89" x2="263" y2="111" stroke="#2a2a2a" strokeWidth="0.8" />
        <line x1="263" y1="89" x2="241" y2="111" stroke="#2a2a2a" strokeWidth="0.8" />
        {/* Tyre tread marks */}
        <circle cx="252" cy="100" r="16" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="3 4" />
      </g>

      {/* ---- Rear Wheel ---- */}
      <g className="wheel-spin" style={{ transformOrigin: '72px 100px' }}>
        <circle cx="72" cy="100" r="18" fill="#111" stroke="#333" strokeWidth="1.5" />
        <circle cx="72" cy="100" r="14" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <circle cx="72" cy="100" r="6" fill="#333" />
        <circle cx="72" cy="100" r="3" fill="#555" />
        <line x1="72" y1="86" x2="72" y2="114" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="58" y1="100" x2="86" y2="100" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="61" y1="89" x2="83" y2="111" stroke="#2a2a2a" strokeWidth="0.8" />
        <line x1="83" y1="89" x2="61" y2="111" stroke="#2a2a2a" strokeWidth="0.8" />
        <circle cx="72" cy="100" r="16" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="3 4" />
      </g>

      {/* ---- ROADRESCUE text on body ---- */}
      <text x="115" y="65" fill="#FFB347" fontSize="7" fontFamily="'Bebas Neue', sans-serif" letterSpacing="2" opacity="0.8">ROADRESCUE</text>

      {/* ---- Warning chevron stripes on rear ---- */}
      <g opacity="0.6">
        <line x1="32" y1="68" x2="36" y2="60" stroke="#FFD700" strokeWidth="1.5" />
        <line x1="38" y1="68" x2="42" y2="60" stroke="#FFD700" strokeWidth="1.5" />
        <line x1="44" y1="68" x2="48" y2="60" stroke="#FFD700" strokeWidth="1.5" />
      </g>

      {/* ---- Exhaust pipe ---- */}
      <rect x="34" y="86" width="4" height="6" rx="1" fill="#333" />
    </svg>
  );
}

/* ====================================================
   City Skyline SVG
   ==================================================== */
function CitySkyline() {
  return (
    <svg width="100%" height="100" viewBox="0 0 1600 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="#12121e" opacity="0.5">
        {/* Buildings batch 1 */}
        <rect x="50" y="40" width="25" height="60" />
        <rect x="80" y="20" width="18" height="80" />
        <rect x="105" y="50" width="30" height="50" />
        <rect x="140" y="30" width="15" height="70" />
        <rect x="160" y="45" width="40" height="55" />
        <rect x="210" y="15" width="20" height="85" />
        <rect x="240" y="55" width="25" height="45" />
        <rect x="280" y="25" width="22" height="75" />
        <rect x="310" y="60" width="35" height="40" />
        <rect x="360" y="35" width="18" height="65" />
        <rect x="385" y="50" width="28" height="50" />
        <rect x="420" y="10" width="15" height="90" />
        <rect x="445" y="45" width="40" height="55" />
        <rect x="500" y="30" width="20" height="70" />
        <rect x="530" y="55" width="30" height="45" />
        <rect x="570" y="20" width="22" height="80" />
        <rect x="600" y="40" width="35" height="60" />
        {/* Buildings batch 2 (repeat for seamless loop) */}
        <rect x="850" y="40" width="25" height="60" />
        <rect x="880" y="20" width="18" height="80" />
        <rect x="905" y="50" width="30" height="50" />
        <rect x="940" y="30" width="15" height="70" />
        <rect x="960" y="45" width="40" height="55" />
        <rect x="1010" y="15" width="20" height="85" />
        <rect x="1040" y="55" width="25" height="45" />
        <rect x="1080" y="25" width="22" height="75" />
        <rect x="1110" y="60" width="35" height="40" />
        <rect x="1160" y="35" width="18" height="65" />
        <rect x="1185" y="50" width="28" height="50" />
        <rect x="1220" y="10" width="15" height="90" />
        <rect x="1245" y="45" width="40" height="55" />
        <rect x="1300" y="30" width="20" height="70" />
        <rect x="1330" y="55" width="30" height="45" />
        <rect x="1370" y="20" width="22" height="80" />
        <rect x="1400" y="40" width="35" height="60" />
      </g>
      {/* Window lights */}
      <g fill="#FFD700" opacity="0.15">
        <rect x="85" y="28" width="3" height="3" />
        <rect x="90" y="35" width="3" height="3" />
        <rect x="85" y="45" width="3" height="3" />
        <rect x="145" y="38" width="3" height="3" />
        <rect x="215" y="22" width="3" height="3" />
        <rect x="215" y="35" width="3" height="3" />
        <rect x="285" y="32" width="3" height="3" />
        <rect x="425" y="18" width="3" height="3" />
        <rect x="425" y="30" width="3" height="3" />
        <rect x="575" y="28" width="3" height="3" />
        <rect x="885" y="28" width="3" height="3" />
        <rect x="890" y="35" width="3" height="3" />
        <rect x="945" y="38" width="3" height="3" />
        <rect x="1015" y="22" width="3" height="3" />
        <rect x="1085" y="32" width="3" height="3" />
        <rect x="1225" y="18" width="3" height="3" />
        <rect x="1375" y="28" width="3" height="3" />
      </g>
    </svg>
  );
}

/* ====================================================
   RoadScene — Main component
   ==================================================== */
export default function RoadScene() {
  const [mode, setMode] = useState('normal'); // 'normal' | 'speed' | 'sos'
  const timeoutRef = useRef(null);
  const skylineRef = useRef(null);
  const sceneRef = useRef(null);

  // Generate random stars
  const stars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
  }, []);

  // Generate fog particles
  const fogParticles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      width: 60 + Math.random() * 120,
      height: 30 + Math.random() * 50,
      bottom: Math.random() * 40,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 8,
    }));
  }, []);

  // Generate road dashes
  const dashes = useMemo(() => Array.from({ length: 30 }, (_, i) => i), []);

  // Generate motion trail lines
  const trailLines = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: 10 + i * 12,
      width: 40 + Math.random() * 160,
      delay: Math.random() * 0.3,
    }));
  }, []);

  // Parallax scroll effect for the skyline
  useEffect(() => {
    const handleScroll = () => {
      if (!skylineRef.current || !sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Calculate how far the scene is scrolled into view
      const progress = 1 - rect.top / viewportH;
      if (progress > 0 && progress < 2) {
        skylineRef.current.style.transform = `translateX(${-progress * 60}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click interaction
  const handleClick = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setMode((prev) => {
      if (prev === 'normal') return 'speed';
      if (prev === 'speed') return 'sos';
      return 'normal';
    });

    timeoutRef.current = setTimeout(() => {
      setMode('normal');
    }, 3000);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const wrapperClasses = [
    'road-scene-wrapper',
    mode === 'speed' ? 'speed-boost' : '',
    mode === 'sos' ? 'sos-mode' : '',
  ].filter(Boolean).join(' ');

  const truckClasses = [
    'truck-container',
    mode === 'speed' ? 'speed-boost' : '',
    mode === 'sos' ? 'sos-mode' : '',
  ].filter(Boolean).join(' ');

  const tooltipText =
    mode === 'normal'
      ? '🖱️ Click truck: Speed Boost → SOS Mode → Normal'
      : mode === 'speed'
      ? '🚀 SPEED BOOST! Click again for SOS'
      : '🆘 SOS MODE — HIGH BEAM ACTIVE';

  return (
    <div
      className={wrapperClasses}
      onClick={handleClick}
      ref={sceneRef}
      role="button"
      tabIndex={0}
      aria-label="Interactive rescue truck animation — click to cycle through Speed Boost and SOS modes"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      {/* Stars */}
      <div className="stars-layer">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* City skyline (parallax) */}
      <div className="city-skyline" ref={skylineRef}>
        <CitySkyline />
      </div>

      {/* Road surface */}
      <div className="road-surface" />

      {/* Road markings */}
      <div className="road-markings">
        {dashes.map((i) => (
          <div key={i} className="road-dash" />
        ))}
      </div>

      {/* Streetlights */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="streetlight">
          <div className="streetlight-arm">
            <div className="streetlight-bulb" />
            <div className="streetlight-cone" />
          </div>
          <div className="streetlight-post" />
        </div>
      ))}

      {/* Fog particles */}
      <div className="fog-container">
        {fogParticles.map((fp) => (
          <div
            key={fp.id}
            className="fog-particle"
            style={{
              width: fp.width,
              height: fp.height,
              bottom: fp.bottom,
              animationDuration: `${fp.duration}s`,
              animationDelay: `${fp.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Motion blur trail */}
      <div className={`motion-trail ${mode === 'speed' ? 'visible' : ''}`}>
        {trailLines.map((tl) => (
          <div
            key={tl.id}
            className="trail-line"
            style={{
              top: tl.top,
              width: tl.width,
              right: 0,
              animationDelay: `${tl.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Headlight beam (emitted from front of truck) */}
      <div className="headlight-beam" style={{
        position: 'absolute',
        bottom: mode === 'sos' ? '90px' : '100px',
        left: '58%',
        width: mode === 'sos' ? '300px' : '150px',
        height: mode === 'sos' ? '80px' : '50px',
        background: mode === 'sos'
          ? 'radial-gradient(ellipse at left center, rgba(255,240,200,0.25) 0%, transparent 70%)'
          : 'radial-gradient(ellipse at left center, rgba(255,240,200,0.1) 0%, transparent 70%)',
        zIndex: 9,
        transition: 'all 0.5s ease',
      }} />

      {/* Tow Truck */}
      <div className={truckClasses}>
        {/* Emergency light bar */}
        <div className="light-bar">
          <div className="light-bar-segment red" />
          <div className="light-bar-segment amber" />
          <div className="light-bar-segment red" />
          <div className="light-bar-segment amber" />
          <div className="light-bar-segment red" />
          <div className="light-bar-segment amber" />
          <div className="light-bar-segment red" />
        </div>
        <TowTruckSVG />
      </div>

      {/* Tooltip */}
      <div className="scene-tooltip">{tooltipText}</div>
    </div>
  );
}
