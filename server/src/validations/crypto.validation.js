const Joi = require('joi');
const { assets: cryptos } = require('../utils/Constants');

const headersSchema = Joi.object({
  authorization: Joi.string()
    .regex(new RegExp(/^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/m))
    .required(),
}).unknown();

const getTopCryptos = {
  headers: headersSchema,
};

const allowedSymbols = Object.values(cryptos.required);
const getSymbolMetrics = {
  headers: headersSchema,
  params: Joi.object({
    symbol: Joi.string()
      .valid(...allowedSymbols)
      .required(),
  }),
};

module.exports = {
  getTopCryptos,
  getSymbolMetrics,
};
