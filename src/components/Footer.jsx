export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-col brand">
          <a href="#" className="logo" style={{ fontSize: '1.8rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18" /><path d="M3 18h18" /><path d="M3 6h18" />
              <circle cx="12" cy="12" r="3" fill="var(--primary-amber)" stroke="none" />
            </svg>
            RoadRescue
          </a>
          <p>Revolutionizing roadside assistance with instant tracking and verified professionals.</p>
        </div>
        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li><a href="#">Tyre Change</a></li>
            <li><a href="#">Jump-Start</a></li>
            <li><a href="#">Fuel Delivery</a></li>
            <li><a href="#">Towing</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Provider Network</a></li>
            <li><a href="#">Trust &amp; Safety</a></li>
            <li><a href="#">Contact Support</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="emergency-contact">
            <h4>Direct Emergency Line</h4>
            <div className="phone">1-800-RESCUE</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2026 RoadRescue Platform. All rights reserved.
      </div>
    </footer>
  );
}
