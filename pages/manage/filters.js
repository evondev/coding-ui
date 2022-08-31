import LayoutDashboard from "components/layout/LayoutDashboard";
import { userRole } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import FilterManage from "modules/filter/FilterManage";
import React from "react";

const FilterPage = () => {
  const { userInfo } = useAuth();
  return (
    <LayoutDashboard
      heading="Manage Filter"
      hasPermission={userInfo?.role === userRole.ADMIN}
    >
      <FilterManage></FilterManage>
    </LayoutDashboard>
  );
};

export default FilterPage;
