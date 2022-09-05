import Button from "components/button/Button";
import ButtonAction from "components/button/ButtonAction";
import Checkbox from "components/checkbox/Checkbox";
import { db } from "components/firebase/firebase-config";
import { IconEdit, IconTrash } from "components/icons";
import LabelStatus from "components/label/LabelStatus";
import LayoutDashboard from "components/layout/LayoutDashboard";
import { userRole, userStatus } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import useFetchMembers from "hooks/useFetchMembers";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { userInfo } = useAuth();
  const { members, handleLoadMore, isReachingEnd } = useFetchMembers();
  return (
    <LayoutDashboard
      heading="Manage users"
      hasPermission={userInfo?.role === userRole.ADMIN}
    >
      <div className="table overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 &&
              members.map((member) => (
                <UserItem key={member.id} member={member} />
              ))}
          </tbody>
        </table>
      </div>
      {!isReachingEnd && (
        <Button
          className="!block mx-auto my-10 w-[160px] bg-third"
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      )}
    </LayoutDashboard>
  );
};

function UserItem({ member }) {
  const { userInfo } = useAuth();
  if (!member) return null;
  const handleDeleteMember = async (id) => {
    if (userInfo?.role !== userRole.ADMIN) {
      toast.error("This feature only for admin!");
      return;
    }
    try {
      const docRef = doc(db, "users", id);
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(docRef);
          toast.success("Delete user successfully");
        }
      });
    } catch (error) {
      toast.error("Delete user failed");
    }
  };
  const handleUpdateStatus = async (status) => {
    if (userInfo?.role !== userRole.ADMIN) {
      toast.error("This feature only for admin!");
      return;
    }
    try {
      const docRef = doc(db, "users", member.id);
      await updateDoc(docRef, {
        status,
      });
      toast.success("Update status successfully");
    } catch (err) {
      console.log(err);
      toast.error("Update status failed");
    }
  };
  const renderStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return (
          <LabelStatus
            onClick={() => handleUpdateStatus(userStatus.INACTIVE)}
            className="bg-green-500"
          >
            Active
          </LabelStatus>
        );
      default:
        return (
          <LabelStatus
            onClick={() => handleUpdateStatus(userStatus.ACTIVE)}
            className="bg-red-500"
          >
            Unactive
          </LabelStatus>
        );
    }
  };
  return (
    <tr>
      <td>
        <Checkbox></Checkbox>
      </td>
      <td className="font-secondary">{member?.fullname || "Anonymous"}</td>
      <td>{member?.email}</td>
      <td>{renderStatus(member.status)}</td>
      <td>
        {new Date(member.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>
        <div className="flex items-center gap-x-5">
          <ButtonAction
            className="hover:text-red-500 hover:border-red-500"
            onClick={() => handleDeleteMember(member.id)}
          >
            <IconTrash></IconTrash>
          </ButtonAction>
        </div>
      </td>
    </tr>
  );
}

export default ManageUsers;
