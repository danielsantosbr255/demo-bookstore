const formatStackTrace = (stack) => {
  if (!stack) return "Stack trace não disponível.";
  return stack
    .split("\n")
    .filter((line) => line.includes("at ") && !line.includes("node_modules"))
    .map((line) => `  ${line.trim()}`)
    .join("\n");
};

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(`Path Request: ${req.method} ${req.originalUrl}`);
    console.error("Status: ", err.statusCode);
    console.error("Message: ", err.message);
    console.error(formatStackTrace(err.stack));
  }

  res.status(err.status || 500).json({
    message: err.message,
    statusCode: err.status || 500,
  });

  next();
};

export default errorHandler;
