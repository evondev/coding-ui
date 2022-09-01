import LayoutDashboard from "components/layout/LayoutDashboard";
import { userRole } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import React from "react";

const ManageUsers = () => {
  const { userInfo } = useAuth();
  return (
    <LayoutDashboard
      heading="Manage users"
      hasPermission={userInfo?.role === userRole.ADMIN}
    >
      <div className="table overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Full name</th>
              <th>Email</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </LayoutDashboard>
  );
};

export default ManageUsers;
