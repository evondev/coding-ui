import CardUpdate from "modules/card/CardUpdate";
import LayoutDashboard from "components/layout/LayoutDashboard";
import { useRouter } from "next/router";
import React from "react";

const UpdateCardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <LayoutDashboard heading="Update card" hasPermission back="/manage/cards">
      <CardUpdate id={id}></CardUpdate>
    </LayoutDashboard>
  );
};

export default UpdateCardPage;
