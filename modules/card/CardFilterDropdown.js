import Dropdown from "components/dropdown/Dropdown";
import { db } from "components/firebase/firebase-config";
import { filterStatus } from "constant/global-constant";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const CardFilterDropdown = ({
  show = false,
  onClick = () => {},
  onClickItem = () => {},
  placeholder = null,
}) => {
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let colRef = collection(db, "filters");
      colRef = query(colRef, where("status", "==", filterStatus.APPROVED));
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((doc) => doc.data());
      setFilterList(data);
    };
    fetchData();
  }, []);
  return (
    <Dropdown
      show={show}
      onClick={onClick}
      placeholder={placeholder || "Select filter"}
    >
      {filterList.map((item) => (
        <div
          key={item.name}
          className="p-3 capitalize rounded cursor-pointer hover:text-blue-500 hover:bg-slate-800"
          onClick={() => onClickItem(item.name)}
        >
          {item.name}
        </div>
      ))}
    </Dropdown>
  );
};

export default CardFilterDropdown;
