import React, { memo } from "react";
import TableBody from "./body";
import TableHeader from "./header";

const AssetsTable = ({ data, search, setSearch, series }) => {
  return (
    <div className="assets-table w-full ">
      <table className="w-full table-auto">
        <TableHeader searchValue={search} searchChangeFn={setSearch} />
        <TableBody items={data} series={series} />
      </table>
    </div>
  );
};

export default memo(AssetsTable);
