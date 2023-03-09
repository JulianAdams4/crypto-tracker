const ALLOWED_APP_IDS = ['crypto-tracker-app'];

const DEFAULT_FIELDS_ASSETS = [
  'id',
  'name',
  'slug',
  'symbol',
  'metrics/market_data',
  'metrics/marketcap',
  'metrics/roi_data',
];

const REQUIRED_ASSETS = {
  BITCOIN: 'bitcoin',
  ETHEREON: 'ethereum',
  CARDANO: 'cardano',
};

module.exports = {
  allowedAppIds: ALLOWED_APP_IDS,
  assets: {
    required: REQUIRED_ASSETS,
    defaultFields: DEFAULT_FIELDS_ASSETS,
  },
};
