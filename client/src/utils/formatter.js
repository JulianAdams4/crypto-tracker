// Make dynamic
export const COUNTRY = "EC";

// Add more countries
export const NATIONS = {
  EC: { nation: "US", minimumFractionDigits: 2, maximumFractionDigits: 2 },
};

// const SEPARATOR_DECIMALS = ".";
export const SEPARATOR_THOUSANDS = ",";
export const SYMBOL = "$ ";

export const currentMoney = (qty = 0) => {
  const defaultNation = NATIONS[COUNTRY];

  let number = typeof qty == "number" ? qty : parseFloat(qty);
  number = isNaN(number) ? 0 : Number(qty);

  return moneyFormat(
    number,
    defaultNation.minimumFractionDigits,
    defaultNation.maximumFractionDigits,
    defaultNation.nation,
    COUNTRY
  );
};

export const moneyFormat = (
  qty = 0,
  minimumFractionDigits,
  maximumFractionDigits,
  nation = "",
  country
) => {
  const intlFormatted = Intl.NumberFormat(nation, {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(qty);

  const thousandSymbol = setSeparatorThousands(country);
  var last = intlFormatted.lastIndexOf(thousandSymbol);

  const butLast = intlFormatted
    .substring(0, last)
    .replace(new RegExp(setSeparatorRegex(country), "g"), "'");
  const finalNumber = butLast + intlFormatted.substring(last);

  return setMoneySymbol() + finalNumber;
};

export const setSeparatorThousands = (country) => {
  switch (country) {
    case "EC":
    default:
      return SEPARATOR_THOUSANDS;
  }
};

export const setMoneySymbol = (country) => {
  switch (country) {
    case "EC":
    default:
      return SYMBOL;
  }
};

export const setSeparatorRegex = (country) => {
  switch (country) {
    case "EC":
    default:
      return "\\.";
  }
};
