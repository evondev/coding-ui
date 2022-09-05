import Button from "components/button/Button";
import ButtonAction from "components/button/ButtonAction";
import Checkbox from "components/checkbox/Checkbox";
import Dropdown from "components/dropdown/Dropdown";
import DropdownItem from "components/dropdown/DropdownItem";
import { db } from "components/firebase/firebase-config";
import { IconTrash } from "components/icons";
import Input from "components/input/Input";
import LabelStatus from "components/label/LabelStatus";
import LayoutDashboard from "components/layout/LayoutDashboard";
import { DATA_PER_PAGE, userRole, userStatus } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import useFetchMembers from "hooks/useFetchMembers";
import useToggle from "hooks/useToggle";
import { debounce } from "lodash";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { userInfo } = useAuth();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState(null);
  const [statusText, setStatusText] = React.useState("");
  const { show: showStatus, toggle: toggleStatus } = useToggle();
  const { members, handleLoadMore, isReachingEnd, total } = useFetchMembers({
    status,
    email: email,
    count: DATA_PER_PAGE,
  });
  const resetSearch = () => {
    setEmail("");
    setStatus(null);
    setStatusText("");
  };
  const handleFilterByEmail = debounce((e) => {
    setEmail(e.target.value);
  }, 500);
  const handleClickStatus = (item) => {
    setStatus(item);
    setStatusText(item === userStatus.ACTIVE ? "Active" : "Inactive");
    toggleStatus();
  };
  return (
    <LayoutDashboard
      heading="Manage users"
      hasPermission={userInfo?.role === userRole.ADMIN}
    >
      <div className="grid flex-wrap grid-cols-1 gap-5 mb-10 lg:flex lg:justify-end">
        <div className="w-full lg:w-[200px]">
          <Input
            name="filter"
            placeholder="Search by email"
            onChange={handleFilterByEmail}
            className="h-[55px]"
          ></Input>
        </div>
        <div className="w-full lg:w-[200px]">
          <Dropdown
            placeholder={statusText || "Status"}
            show={showStatus}
            onClick={toggleStatus}
          >
            <DropdownItem onClick={() => handleClickStatus(userStatus.ACTIVE)}>
              Active
            </DropdownItem>
            <DropdownItem
              onClick={() => handleClickStatus(userStatus.INACTIVE)}
            >
              Inactive
            </DropdownItem>
          </Dropdown>
        </div>
        <Button
          onClick={resetSearch}
          className="w-full h-full p-2 lg:w-auto !bg-slate-700 button-effect"
        >
          Clear filter
        </Button>
      </div>
      <div className="mb-10">Found: {total}</div>
      <div className="table overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {/* <th>&nbsp;</th> */}
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
          className="!flex mx-auto my-10 w-[160px] !bg-transparent border border-third"
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
      {/* <td>
        <Checkbox></Checkbox>
      </td> */}
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
