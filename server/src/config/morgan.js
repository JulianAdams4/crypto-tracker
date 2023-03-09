const morgan = require('morgan');
const util = require('util');
const config = require('./config');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIpFormat = () =>
  config.env === 'production' ? ':remote-addr - ' : '';
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => console.log(util.inspect(message.trim())) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => console.error(util.inspect(message.trim())) },
});

module.exports = {
  successHandler,
  errorHandler,
};
