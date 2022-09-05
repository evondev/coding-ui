import IconQuestion from "./../../components/icons/IconQuestion";
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import LabelStatus from "components/label/LabelStatus";
import ButtonAction from "components/button/ButtonAction";
import Button from "components/button/Button";
import useFetchCards from "hooks/useFetchCards";
import { cardStatus, DATA_PER_PAGE, userRole } from "constant/global-constant";
import { IconEdit, IconTrash } from "components/icons";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "components/firebase/firebase-config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ButtonNew from "components/button/ButtonNew";
import Input from "components/input/Input";
import Dropdown from "components/dropdown/Dropdown";
import useInputChange from "hooks/useInputChange";
import DropdownItem from "components/dropdown/DropdownItem";
import CardFilterDropdown from "./CardFilterDropdown";
import useToggle from "hooks/useToggle";
import { debounce } from "lodash";
import { useAuth } from "contexts/auth-context";
import Checkbox from "components/checkbox/Checkbox";
import { globalStore } from "store/global-store";
import shallow from "zustand/shallow";

const CardManage = (props) => {
  const [filter, setFilter] = React.useState("");
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState(null);
  const [statusText, setStatusText] = React.useState("");
  const { show, toggle } = useToggle();
  const { show: showStatus, toggle: toggleStatus } = useToggle();
  const handleClickFilter = (item) => {
    setFilter(item);
    toggle();
  };
  const handleClickStatus = (item) => {
    setStatus(item);
    setStatusText(item === cardStatus.APPROVED ? "Approved" : "Rejected");
    toggleStatus();
  };
  const { cards, handleLoadMore, isReachingEnd, total } = useFetchCards({
    status,
    name,
    filter,
    count: DATA_PER_PAGE,
    isManage: true,
  });
  const resetSearch = () => {
    setName("");
    setStatus(null);
    setFilter("");
    setStatusText("");
  };
  const handleFilterByTitle = debounce((e) => {
    setName(e.target.value);
  }, 500);
  return (
    <div className="mt-10">
      <ButtonNew href="/manage/new-card"></ButtonNew>
      <div className="grid flex-wrap grid-cols-1 gap-5 mb-10 lg:flex lg:justify-end">
        <div className="w-full lg:w-[200px]">
          <Input
            name="filter"
            placeholder="Search by title"
            onChange={handleFilterByTitle}
            className="h-[55px]"
          ></Input>
        </div>
        <div className="w-full lg:w-[200px]">
          <Dropdown
            placeholder={statusText || "Status"}
            show={showStatus}
            onClick={toggleStatus}
          >
            <DropdownItem
              onClick={() => handleClickStatus(cardStatus.APPROVED)}
            >
              Approved
            </DropdownItem>
            <DropdownItem onClick={() => handleClickStatus(cardStatus.PENDING)}>
              Pending
            </DropdownItem>
            <DropdownItem
              onClick={() => handleClickStatus(cardStatus.REJECTED)}
            >
              Reject
            </DropdownItem>
          </Dropdown>
        </div>
        <div className="w-full lg:w-[200px]">
          <CardFilterDropdown
            show={show}
            onClick={toggle}
            onClickItem={handleClickFilter}
            placeholder={filter}
          ></CardFilterDropdown>
        </div>
        <Button
          onClick={resetSearch}
          className="w-full h-full p-2 lg:w-auto !bg-slate-700 button-effect"
        >
          Clear filter
        </Button>
      </div>
      <div className="mb-10">Found: {total}</div>
      <div className="w-full overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Filter</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.length === 0 && (
              <tr>
                <td colSpan={7}>No data</td>
              </tr>
            )}
            {cards.length > 0 &&
              cards.map((card) => (
                <CardRow key={card.title} card={card}></CardRow>
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
    </div>
  );
};

const CardRow = ({ card }) => {
  const { userInfo } = useAuth();
  const renderStatus = (status) => {
    switch (status) {
      case cardStatus.APPROVED:
        return <LabelStatus className="bg-green-500">Approved</LabelStatus>;
      case cardStatus.PENDING:
        return <LabelStatus className="bg-orange-500">Pending</LabelStatus>;

      default:
        return <LabelStatus className="bg-red-500">Rejected</LabelStatus>;
    }
  };
  const handleDeleteCard = async (id) => {
    if (userInfo?.role !== userRole.ADMIN) {
      return;
    }
    try {
      const docRef = doc(db, "cards", id);
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(docRef);
          toast.success("Delete card successfully");
        }
      });
    } catch (error) {
      toast.error("Delete card failed");
    }
  };
  const { setIsShowReasonModal, setReason } = globalStore(
    (state) => ({
      setReason: state.setReason,
      isShowReasonModal: state.isShowReasonModal,
      setIsShowReasonModal: state.setIsShowReasonModal,
    }),
    shallow
  );
  const handleShowReason = (reason) => {
    setIsShowReasonModal(true);
    setReason(reason);
  };
  return (
    <tr>
      {/* <td>
        <Checkbox></Checkbox>
      </td> */}
      <td>
        <Link href={`/manage/update-card?id=${card.id}`}>
          <a className="text-white">{card.title}</a>
        </Link>
      </td>
      <td className="capitalize">{card.filter}</td>
      <td>{renderStatus(card.status)}</td>
      <td>
        {new Date(card.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>
        <div className="flex flex-col gap-1">
          <p>{card.userFullname || "Admin"}</p>
          <p className="text-sm text-slate-500">{card.userEmailAddress}</p>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-x-5">
          <ButtonAction
            className="hover:text-slate-400 hover:border-slate-400text-slate-400"
            onClick={() => handleShowReason(card.reason || "")}
          >
            <IconQuestion />
          </ButtonAction>
          <Link href={`/manage/update-card?id=${card.id}`}>
            <a>
              <ButtonAction className="hover:text-blue-500 hover:border-blue-500">
                <IconEdit></IconEdit>
              </ButtonAction>
            </a>
          </Link>

          {userInfo?.role === userRole.ADMIN && (
            <ButtonAction
              className="hover:text-red-500 hover:border-red-500"
              onClick={() => handleDeleteCard(card.id)}
            >
              <IconTrash></IconTrash>
            </ButtonAction>
          )}
        </div>
      </td>
    </tr>
  );
};

CardManage.propTypes = {};

export default CardManage;
