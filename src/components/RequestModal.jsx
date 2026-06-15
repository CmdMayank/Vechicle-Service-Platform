import { useState, useRef, useCallback, useEffect } from 'react';

export default function RequestModal({ isOpen, onClose, prefillSOS }) {
  const [phase, setPhase] = useState('form'); // 'form' | 'locating' | 'pinging' | 'matched'
  const [locationInput, setLocationInput] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [locError, setLocError] = useState('');
  const [showMap, setShowMap] = useState(false);

  const formRef = useRef(null);
  const timerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setPhase('form');
      setLocationInput('');
      setIsDetecting(false);
      setLocError('');
      setShowMap(false);
      if (prefillSOS && formRef.current) {
        const select = formRef.current.querySelector('select');
        if (select) select.selectedIndex = 4;
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [isOpen, prefillSOS]);

  const updateAddress = useCallback(async (lat, lon) => {
    setLocationInput(`Coordinates: ${lat.toFixed(5)}, ${lon.toFixed(5)}`);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
        headers: { 'Accept-Language': 'en' }
      });
      const data = await res.json();
      if (data && data.display_name) {
        const parts = data.display_name.split(',');
        const shortAddress = parts.slice(0, 3).join(',').trim();
        setLocationInput(`${shortAddress} (${lat.toFixed(4)}, ${lon.toFixed(4)})`);
      }
    } catch (err) {
      console.error('Reverse Geocode failed', err);
    }
  }, []);

  const detectRealtimeLocation = useCallback(() => {
    setIsDetecting(true);
    setLocError('');

    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocationInput(`GPS: ${lat.toFixed(6)}, ${lon.toFixed(6)} (Verified Location)`);
        setIsDetecting(false);

        // Center map if open
        if (mapRef.current && markerRef.current) {
          mapRef.current.setView([lat, lon], 14);
          markerRef.current.setLatLng([lat, lon]);
        }

        // Fetch street address
        updateAddress(lat, lon);
      },
      (error) => {
        let msg = 'Failed to detect location. Please type manually or click Map.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Permission denied. Please grant location access, type, or click Map.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location unavailable. Please type manually or click Map.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out. Please try again, type, or click Map.';
        }
        setLocError(msg);
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  }, [updateAddress]);

  // Leaflet map initialization
  useEffect(() => {
    let timer;
    if (showMap) {
      timer = setTimeout(() => {
        const L = window.L;
        if (!L) {
          setLocError('Map library failed to load. Please try again.');
          return;
        }

        const mapContainer = document.getElementById('map-selector');
        if (!mapContainer || mapRef.current) return;

        // Default coordinates: San Francisco
        const defaultCoords = [37.7749, -122.4194];

        // Initialize map
        const map = L.map('map-selector', {
          zoomControl: true,
          attributionControl: true
        }).setView(defaultCoords, 13);
        mapRef.current = map;

        // Dark maps tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap &copy; CARTO'
        }).addTo(map);

        // Custom orange pin
        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `<div style="
            width: 24px;
            height: 24px;
            background: #FF6B35;
            border: 3px solid #FFF;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 0 10px rgba(255, 107, 53, 0.8);
            position: relative;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: #FFF;
              border-radius: 50%;
              position: absolute;
              top: 5px;
              left: 5px;
            "></div>
          </div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 24]
        });

        // Add Marker
        const marker = L.marker(defaultCoords, {
          icon: customIcon,
          draggable: true
        }).addTo(map);
        markerRef.current = marker;

        // Event: Map click
        map.on('click', (e) => {
          const { lat, lng } = e.latlng;
          marker.setLatLng([lat, lng]);
          updateAddress(lat, lng);
        });

        // Event: Marker drag
        marker.on('dragend', () => {
          const { lat, lng } = marker.getLatLng();
          updateAddress(lat, lng);
        });

        // Auto center map to real GPS if permission granted
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const userLat = pos.coords.latitude;
              const userLon = pos.coords.longitude;
              map.setView([userLat, userLon], 14);
              marker.setLatLng([userLat, userLon]);
              updateAddress(userLat, userLon);
            },
            () => {},
            { timeout: 3000 }
          );
        }
      }, 100);
    }

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [showMap, updateAddress]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setPhase('locating');

    timerRef.current = setTimeout(() => {
      setPhase('pinging');

      timerRef.current = setTimeout(() => {
        setPhase('matched');

        timerRef.current = setTimeout(() => {
          onClose();
        }, 5000);
      }, 2500);
    }, 2000);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={`modal-overlay${isOpen ? ' active' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>&times;</button>
        <h3>Request Assistance</h3>
        <p>Tell us what&apos;s wrong and we&apos;ll send the right professional immediately.</p>

        {phase === 'form' && (
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Service Needed</label>
              <select className="form-control" required defaultValue="">
                <option value="" disabled>Select Service...</option>
                <option>Tyre Change</option>
                <option>Battery Jump-Start</option>
                <option>Fuel Delivery</option>
                <option>Towing</option>
                <option>Mechanic On-Site</option>
                <option>Lockout Rescue</option>
              </select>
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select className="form-control" required defaultValue="">
                <option value="" disabled>Select Vehicle...</option>
                <option>Sedan / Hatchback</option>
                <option>SUV / Truck</option>
                <option>Motorcycle</option>
                <option>Commercial Van</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Your Location</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address or landmark..."
                  style={{ paddingRight: '150px' }}
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  required
                />
                <div style={{ position: 'absolute', right: '5px', display: 'flex', gap: '5px', height: 'calc(100% - 10px)' }}>
                  <button
                    type="button"
                    onClick={detectRealtimeLocation}
                    title="Detect Current Location"
                    style={{
                      background: isDetecting ? 'rgba(255, 107, 53, 0.15)' : 'rgba(255, 107, 53, 0.1)',
                      border: '1px solid var(--primary-amber)',
                      color: 'var(--primary-amber)',
                      borderRadius: '8px',
                      padding: '0 10px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                    disabled={isDetecting}
                  >
                    {isDetecting ? (
                      <span className="spinner" style={{ width: '10px', height: '10px', marginRight: 0, borderWidth: '1px' }} />
                    ) : (
                      '📍 Auto'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMap(!showMap)}
                    title="Select Location on Map"
                    style={{
                      background: showMap ? 'var(--primary-amber)' : 'rgba(255, 107, 53, 0.1)',
                      border: '1px solid var(--primary-amber)',
                      color: showMap ? '#fff' : 'var(--primary-amber)',
                      borderRadius: '8px',
                      padding: '0 10px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {showMap ? '✕ Map' : '🗺️ Map'}
                  </button>
                </div>
              </div>
              
              {showMap && (
                <div style={{ marginTop: '10px' }}>
                  <div
                    id="map-selector"
                    style={{
                      width: '100%',
                      height: '220px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,107,53,0.3)',
                      overflow: 'hidden'
                    }}
                  />
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px', textAlign: 'left' }}>
                    🖱️ Drag the pin or click anywhere on the map to select your breakdown location.
                  </div>
                </div>
              )}

              {locError && (
                <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '6px', textAlign: 'left' }}>
                  ⚠️ {locError}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Brief Description (Optional)</label>
              <textarea className="form-control" placeholder="E.g., I'm safely pulled over on the right shoulder of Highway 101, just past exit 42..." />
            </div>
            <button type="submit" className="btn-primary submit-btn">Find Nearest Provider</button>
          </form>
        )}

        {phase === 'locating' && (
          <div className="location-status">
            <span className="spinner" /> Verifying location coordinates...
          </div>
        )}

        {phase === 'pinging' && (
          <div className="location-status">
            📍 Location verified: <strong>{locationInput || 'I-95 North, Mile Marker 42'}</strong>
            <br /><br />
            <span className="spinner" style={{ width: 14, height: 14 }} /> Pinging nearby providers...
          </div>
        )}

        {phase === 'matched' && (
          <div className="location-status">
            <div style={{ color: 'var(--success)', fontSize: '1.2rem', marginBottom: 10 }}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Provider Matched!
            </div>
            <strong>Mike&apos;s Auto Repair</strong> is en route.<br />
            ETA: 12 minutes.
          </div>
        )}
      </div>
    </div>
  );
}


