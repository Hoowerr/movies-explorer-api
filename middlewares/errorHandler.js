module.exports = ((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'An error occurred on the server';
  res.status(status).send({ message });
  next();
});
