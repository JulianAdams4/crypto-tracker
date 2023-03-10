import React, { memo } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { IMAGES_URL } from "utils/constants";
import { coloredPercentage } from "./helpers";
import { formatMoney, formatPercentage } from "utils/formatter";

const TableBody = ({ items = [], series = {} }) => {
  return (
    <tbody>
      {items.map((asset, index) => {
        return (
          <tr key={`body-${asset.id}`} className={`odd:bg-gray3 even:bg-gray4`}>
            <TableCell
              type="text"
              value={index + 1}
              align="center py-3 font-bold"
            />

            <TableCell
              type="custom"
              value={
                <div className="flex align-center asset-name-col">
                  <img
                    className="scale-[0.6]"
                    src={`${IMAGES_URL}/${asset.id}/32.png?v=2`}
                    alt={`${asset.name} logo`}
                  />
                  <div className="my-auto">
                    <span className="my-auto text-blue2">{asset.name}</span>
                    <span className="text-white">{` · ${asset.symbol}`}</span>
                  </div>
                </div>
              }
              align="left font-bold"
            />

            <TableCell
              type="money-long"
              value={asset.metrics.market_data.price_usd}
              align="right font-bold"
            />

            <TableCell
              type="percentage"
              value={asset.metrics.market_data.percent_change_usd_last_1_hour}
              align="right font-bold"
            />

            <TableCell
              type="percentage"
              value={asset.metrics.market_data.percent_change_usd_last_24_hours}
              align="right font-bold"
            />

            <CellChart id={asset.id} data={series[asset.slug]} />

            <TableCell
              type="money"
              value={asset.metrics.marketcap.current_marketcap_usd}
              align="right font-bold"
            />

            <TableCell
              type="money"
              value={asset.metrics.market_data.real_volume_last_24_hours}
              align="right font-bold"
            />

            <TableCell
              type="percentage"
              value={asset.metrics.roi_data.percent_change_last_1_week}
              align="right font-bold"
            />

            <TableCell
              type="percentage"
              value={asset.metrics.roi_data.percent_change_last_1_month}
              align="right font-bold"
            />

            <TableCell
              type="percentage"
              value={asset.metrics.roi_data.percent_change_year_to_date}
              align="right font-bold"
            />
          </tr>
        );
      })}
    </tbody>
  );
};

const TableCell = memo(({ type, value, align = "right" }) => {
  let isColored;
  let formattedValue;

  switch (type) {
    case "money":
      isColored = false;
      formattedValue = formatMoney(value, "compact");
      break;
    case "money-long":
      isColored = false;
      formattedValue = formatMoney(value, "standard");
      break;
    case "percentage":
      isColored = true;
      formattedValue = formatPercentage(value);
      break;
    case "text":
    case "custom":
      isColored = false;
      formattedValue = value;
      break;
    default:
      break;
  }

  return (
    <td className={`text-sm text-${align} px-6`}>
      <span
        className={`my-auto ${
          isColored ? coloredPercentage(value) : "text-white"
        } `}
      >
        {formattedValue}
      </span>
    </td>
  );
});

const CellChart = memo(({ id = "", data = [] }) => {
  return (
    <td key={`chart-${id}`} className="text-sm text-right px-6 asset-chart-col">
      <Sparklines data={data} width={200} height={50}>
        <SparklinesLine color="#0A59A4" style={{ fill: "none" }} />
      </Sparklines>
    </td>
  );
});

export default memo(TableBody);
