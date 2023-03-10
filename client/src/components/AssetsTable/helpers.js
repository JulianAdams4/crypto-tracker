export const tableColumns = [
  { key: "counter", label: "#" },
  { key: "asset", label: "asset", searchable: true },
  { key: "priceUsd", label: "price (usd)" },
  { key: "changeUsd1h", label: ["change vs usd", "(1h)"].join("\n") },
  { key: "changeUsd24h", label: ["change vs usd", "(24h)"].join("\n") },
  { key: "daytrend", label: "7 day trend" },
  { key: "reportedMarketcap", label: ["reported", "marketcap"].join("\n") },
  { key: "realVolume24h", label: ["real volume", "(24h)"].join("\n") },
  { key: "changeUsd7d", label: ["change vs usd", "(7d)"].join("\n") },
  { key: "changeUsd30d", label: ["change vs usd", "(30d)"].join("\n") },
  { key: "changeUsdYtd", label: ["change vs usd", "(ytd)"].join("\n") },
];

export const headerStyles = {
  counter: "w-[3%]",
  asset: "w-[14%] text-left px-6 asset-name-col",
  priceUsd: "w-[9%] text-right px-6",
  changeUsd1h: "w-[9%] text-right px-6",
  changeUsd24h: "w-[9%] text-right px-6",
  daytrend: "w-[10%] text-right px-6 asset-chart-col",
  reportedMarketcap: "w-[9%] text-right px-6",
  realVolume24h: "w-[9%] text-right px-6",
  changeUsd7d: "w-[9%] text-right px-6",
  changeUsd30d: "w-[9%] text-right px-6",
  changeUsdYtd: "w-[9%] text-right px-6",
};

export const coloredPercentage = (value) => {
  return value < 0 ? "text-red" : "text-green";
};

export const formatPercentage = (value) => {
  const prefix = value >= 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
};

export const formatMoney = (value, notation) => {
  const formatter = Intl.NumberFormat("en", {
    notation,
    maximumFractionDigits: 2,
  });
  return `$${formatter.format(value)}`;
};

export const getFormattedDate = (customDate = null) => {
  const currDate = customDate || new Date();
  const offset = currDate.getTimezoneOffset();
  const newCurrDate = new Date(currDate.getTime() - offset * 60 * 1000);
  return newCurrDate.toISOString().split("T")[0];
};
