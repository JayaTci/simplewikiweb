function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500,
  });
}

module.exports = errorHandler;
