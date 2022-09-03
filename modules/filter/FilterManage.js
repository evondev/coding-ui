import ButtonAction from "components/button/ButtonAction";
import ButtonNew from "components/button/ButtonNew";
import { db } from "components/firebase/firebase-config";
import { IconEdit, IconTrash } from "components/icons";
import LabelStatus from "components/label/LabelStatus";
import { filterStatus, userRole } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import { deleteDoc, doc } from "firebase/firestore";
import useFetchFilter from "hooks/useFetchFilter";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const FilterManage = () => {
  const { filters } = useFetchFilter();
  if (filters.length <= 0) return null;
  return (
    <div className="mt-10">
      <ButtonNew href="/manage/new-filter"></ButtonNew>
      <div className="table overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filters.map((filter) => (
              <FilterRow key={filter.id} filter={filter}></FilterRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FilterRow = ({ filter }) => {
  const { userInfo } = useAuth();
  const renderStatus = (status) => {
    switch (status) {
      case filterStatus.APPROVED:
        return <LabelStatus className="bg-green-500">Approved</LabelStatus>;

      default:
        return <LabelStatus className="bg-red-500">Rejected</LabelStatus>;
    }
  };
  const handleDeleteFilter = async (id) => {
    if (userInfo?.role !== userRole.ADMIN) {
      toast.error("This feature only for admin!");
      return;
    }
    try {
      const docRef = doc(db, "filters", id);
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(docRef);
          toast.success("Delete filter successfully");
        }
      });
    } catch (error) {
      toast.error("Delete filter failed");
    }
  };
  return (
    <tr>
      <td className="capitalize">{filter.name}</td>
      <td>{renderStatus(filter.status)}</td>
      <td>
        {new Date(filter.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>
        <div className="flex items-center gap-x-5">
          <Link href={`/manage/update-filter?id=${filter.id}`}>
            <a>
              <ButtonAction className="hover:text-blue-500 hover:border-blue-500">
                <IconEdit></IconEdit>
              </ButtonAction>
            </a>
          </Link>
          <ButtonAction
            className="hover:text-red-500 hover:border-red-500"
            onClick={() => handleDeleteFilter(filter.id)}
          >
            <IconTrash></IconTrash>
          </ButtonAction>
        </div>
      </td>
    </tr>
  );
};

export default FilterManage;
