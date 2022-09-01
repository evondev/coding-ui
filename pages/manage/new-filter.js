import LayoutDashboard from "components/layout/LayoutDashboard";
import { userRole } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import FilterAddNew from "modules/filter/FilterAddNew";
import React from "react";

const AddFilter = () => {
  const { userInfo } = useAuth();

  return (
    <LayoutDashboard
      heading="Add new filter"
      hasPermission={userInfo?.role === userRole.ADMIN}
      back="/manage/filters"
    >
      <FilterAddNew></FilterAddNew>
    </LayoutDashboard>
  );
};

export default AddFilter;
