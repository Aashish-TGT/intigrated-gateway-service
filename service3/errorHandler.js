module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Log error details in dev mode
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }) // Only in dev
  });
};
