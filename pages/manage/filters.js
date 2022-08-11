import LayoutDashboard from "components/layout/LayoutDashboard";
import FilterManage from "modules/filter/FilterManage";
import React from "react";

const FilterPage = () => {
  return (
    <LayoutDashboard heading="Manage Filter">
      <FilterManage></FilterManage>
    </LayoutDashboard>
  );
};

export default FilterPage;
