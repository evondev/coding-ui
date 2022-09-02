import React from "react";
import Head from "next/head";
import LayoutDashboard from "components/layout/LayoutDashboard";
import CardAddNew from "modules/card/CardAddNew";

const AddNewCardPage = () => {
  return (
    <LayoutDashboard
      heading="Add new Card UI"
      back="/manage/cards"
      hasPermission
    >
      <CardAddNew></CardAddNew>
    </LayoutDashboard>
  );
};

export default AddNewCardPage;
