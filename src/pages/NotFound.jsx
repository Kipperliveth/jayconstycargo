import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// import './NotFound.scss';

function NotFound() {
  return (
    <main className="notfound">
      {/* Giant Background Watermark */}
      <div className="notfound__watermark" aria-hidden="true">
        404
      </div>

      {/* Foreground Content */}
      <div className="notfound__content">
        <h1 className="notfound__title">Shipment not found</h1>
        <p className="notfound__description">
          Looks like this cargo got lost in transit. The page you are looking for might have been moved, deleted, or never existed in our logistics network.
        </p>
        
        <Link to="/" className="btn-home">
          Return to Base <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}

export default NotFound;