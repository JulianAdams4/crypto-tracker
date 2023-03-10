import React, { memo } from "react";
import TableBody from "./body";
import TableHeader from "./header";

const AssetsTable = ({ data, search, setSearch }) => {
  return (
    <div className="assets-table w-full ">
      <table className="w-full table-auto">
        <TableHeader searchValue={search} searchChangeFn={setSearch} />
        <TableBody items={data} />
      </table>
    </div>
  );
};

export default memo(AssetsTable);
