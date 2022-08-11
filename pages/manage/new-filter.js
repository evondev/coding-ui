import LayoutDashboard from "components/layout/LayoutDashboard";
import FilterAddNew from "modules/filter/FilterAddNew";
import React from "react";

const AddFilter = () => {
  return (
    <LayoutDashboard heading="Add new filter">
      <FilterAddNew></FilterAddNew>
    </LayoutDashboard>
  );
};

export default AddFilter;
