const config = require('../config/config');
const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version,
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
