const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? "Internal Server Error";

  console.error(`[ERROR] ${req.method} ${req.originalUrl} → ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler; //Note- handle -> catch block error such as Internal Server Error
