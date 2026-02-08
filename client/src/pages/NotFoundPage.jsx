/**
 * NotFoundPage — 404 Error View
 *
 * Displayed for any route that doesn't match a defined path.
 * Provides a link back to the main page.
 */

import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="error-page">
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="back-link">Return to Main Page</Link>
    </div>
  );
}

export default NotFoundPage;
