import React from "react";
import { tableColumns, headerStyles } from "./helpers";

const TableHeader = ({ searchValue, searchChangeFn }) => (
  <thead>
    <tr>
      {tableColumns.map((col) => {
        const baseCellClassName = [
          "py-4",
          "bg-gray4 border border-gray2",
          "hover:cursor-pointer",
          `${headerStyles[col.key] || ""}`,
        ]
          .join(" ")
          .trim();

        return (
          <th key={`header-${col.key}`} className={baseCellClassName}>
            <div
              className={[
                "text-white uppercase text-xs font-normal",
                "hover:text-blue2",
                col.searchable ? "flex gap-6" : "",
              ].join(" ")}
            >
              <p className="my-auto">{col.label}</p>

              {col.searchable && (
                <div className="relative inline-block">
                  <span className="absolute left-2 top-2 scale-[1]">🔍</span>
                  <input
                    className={[
                      "w-11/12",
                      "pl-7 pr-3 py-1",
                      "rounded-xl outline-none",
                      "bg-gray4 border border-gray2",
                      "text-sm font-normal text-white",
                    ].join(" ")}
                    onChange={(e) => searchChangeFn(e.target.value)}
                    value={searchValue}
                  />
                </div>
              )}
            </div>
          </th>
        );
      })}
    </tr>
  </thead>
);

export default TableHeader;
