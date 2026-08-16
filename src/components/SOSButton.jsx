import { useState, useRef, useCallback } from 'react';

export default function SOSButton({ onRequestHelp }) {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef(null);

  const handleSOS = useCallback(() => {
    if (active) return;
    setActive(true);

    
    timeoutRef.current = setTimeout(() => {
      setActive(false);
      setTimeout(() => {
        onRequestHelp('sos');
      }, 400);
    }, 3500);
  }, [active, onRequestHelp]);

  return (
    <>
      <div id="sos-btn" title="Emergency SOS" onClick={handleSOS}>SOS</div>

      <div className={`sos-overlay${active ? ' active' : ''}`}>
        <div className="sos-radar" />
        <h2>EMERGENCY SOS</h2>
        <p>Connecting you to the nearest first responder...</p>
      </div>
    </>
  );
}
