/**
 * Loading — Spinner Placeholder
 *
 * Displays a CSS-animated spinner and "Loading..." text.
 * Shown while async data is being fetched.
 */

function Loading() {
  return (
    <div className="loading">
      <div className="loading-spinner" />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
