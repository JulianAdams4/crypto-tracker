import api from "./instance";
import { DEFAULT_ASSETS_FIELDS } from "utils/constants";

export const getTopAssets = (fields = DEFAULT_ASSETS_FIELDS) => {
  const fieldsStr = `fields=${fields.join(",")}`;
  return api.get(`/assets?${fieldsStr}/market_data/price_usd`);
};

export const getAsset = (assetName) => api.get(`/assets/${assetName}/metrics`);

export const getAssetProfile = (assetName) =>
  api.get(`/assets/${assetName}/profile`);
