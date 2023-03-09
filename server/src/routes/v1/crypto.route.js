const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cryptoValidation = require('../../validations/crypto.validation');
const cryptoController = require('../../controllers/crypto.controller');

const router = express.Router();

router.get(
  '/all',
  auth(),
  validate(cryptoValidation.getTopCryptos),
  cryptoController.getTopCryptos
);

router.post(
  '/:symbol/timeseries',
  auth(),
  validate(cryptoValidation.getSymbolMetrics),
  cryptoController.getSymbolTimeSeries
);

module.exports = router;
