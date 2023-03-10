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

export const getPreviousDate = (prevDaysQty = 0) => {
  const today = new Date();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - prevDaysQty
  );
};

export const getFormattedDate = (customDate = null) => {
  const currDate = customDate || new Date();
  const offset = currDate.getTimezoneOffset();
  const newCurrDate = new Date(currDate.getTime() - offset * 60 * 1000);
  return newCurrDate.toISOString().split("T")[0];
};

