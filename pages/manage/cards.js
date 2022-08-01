import LayoutDashboard from "components/layout/LayoutDashboard";
import CardManage from "modules/card/CardManage";
import React from "react";

const CardManagePage = () => {
  return (
    <LayoutDashboard heading="Manage Card UI">
      <CardManage></CardManage>
    </LayoutDashboard>
  );
};

export default CardManagePage;
