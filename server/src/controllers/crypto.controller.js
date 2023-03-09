const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const apiIntegration = require('../api/messari-integration/api');
const { assets: cryptos } = require('../utils/Constants');

/*
  /assets?fields=id,slug,symbol,metrics/market_data,metrics/roi_data
*/
const getTopCryptos = catchAsync(async (req, res) => {
  const integrationResp = await apiIntegration.call(
    req,
    `/assets?fields=${cryptos.defaultFields.join(',')}`,
    apiIntegration.METHOD.GET
  );
  const filteredCryptos =
    (integrationResp &&
      integrationResp.data &&
      integrationResp.data.data &&
      integrationResp.data.data.filter((item) =>
        Object.values(cryptos.required).includes(item.slug)
      )) ||
    [];
  return res.status(httpStatus.OK).send(filteredCryptos);
});

/*
  /assets/bitcoin/metrics/price/time-series?start=2023-03-02&end=2023-03-08&interval=1d&columns=open&fields=slug,values
*/
const getSymbolTimeSeries = catchAsync(async (req, res) => {
  const { symbol } = pick(req.params, ['symbol']);
  const { start, end, interval = '1d' } = pick(req.body, [
    'start',
    'end',
    'interval',
  ]);
  const integrationResp = await apiIntegration.call(
    req,
    `/assets/${symbol}/metrics/price/time-series?${[
      `start=${start}`,
      `end=${end}`,
      `interval=${interval}`,
      'columns=open',
      'fields=slug,values',
    ].join('&')}`,
    apiIntegration.METHOD.GET
  );
  const parsedResponse = (integrationResp &&
    integrationResp.data &&
    integrationResp.data.data) || { slug: symbol, values: [] };
  return res.status(httpStatus.OK).send(parsedResponse);
});

module.exports = {
  getTopCryptos,
  getSymbolTimeSeries,
};
