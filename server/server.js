/**
 * DevWiki — Express Server Entry Point
 *
 * Configures middleware (security, CORS, rate-limiting),
 * registers API routes, and serves the React client in production.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Route handlers
const articlesRouter = require('./routes/articles');
const searchRouter = require('./routes/search');

// Centralized error handler
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// --------------- Middleware ---------------
app.use(helmet());        // Set secure HTTP headers
app.use(cors());          // Enable cross-origin requests (dev & external clients)
app.use(express.json());  // Parse incoming JSON request bodies

// Rate-limit all /api/ routes — max 100 requests per 15-minute window
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', limiter);

// --------------- API Routes ---------------
app.use('/api/articles', articlesRouter);
app.use('/api/search', searchRouter);

// --------------- Production Static Serving ---------------
// Serve the built React client and fall back to index.html for client-side routing
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// --------------- Error Handling ---------------
app.use(errorHandler);

// --------------- Start Server ---------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
