import packageJson from "../../package.json";

export const API_URL = process.env.REACT_APP_API_URL;

export const IMAGES_URL = process.env.REACT_APP_API_IMAGES_URL;

export const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

export const TREND_DAYS = 7

export const DEFAULT_ASSETS_FIELDS = ["id", "slug", "symbol", "metrics"];

export const REQUIRED_ASSETS = {
  BITCOIN: "bitcoin",
  ETHEREON: "ethereum",
  CARDANO: "cardano",
};

export const APP_ID = packageJson.name;
