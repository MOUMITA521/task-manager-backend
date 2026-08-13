function timeLogger(req, res, next) {
  const currentTime = new Date().toLocaleTimeString();
  console.log(`[${currentTime}] ${req.method} request aayi: ${req.url}`);
  next();
}

module.exports = timeLogger;