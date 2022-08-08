import Dropdown from "components/dropdown/Dropdown";
import { db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Textarea from "components/textarea/Textarea";
import { cardStatus } from "constant/global-constant";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import useToggle from "hooks/useToggle";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CardAddNew = () => {
  const [filterList, setFilterList] = useState([]);
  const [values, setValues] = useState({
    title: "",
    filter: "",
    htmlCode: "",
    cssCode: "",
    status: cardStatus.APPROVED,
  });
  const handleAddNewCard = (e) => {
    e.preventDefault();
    const isAllInputFilled = Object.values(values).every((item) => item !== "");
    if (!isAllInputFilled) {
      toast.error("Please fill all inputs");
      return;
    }
    const colRef = collection(db, "cards");
    try {
      addDoc(colRef, {
        ...values,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setValues({
        title: "",
        filter: "",
        htmlCode: "",
        cssCode: "",
      });
    }
    toast.success("Card added successfully");
  };
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "filters");
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((doc) => doc.data());
      setFilterList(data);
    };
    fetchData();
  }, []);
  const { onChange } = useInputChange(values, setValues);
  const { show: showFilter, toggle } = useToggle();
  const handleSelectFilter = (filter) => {
    setValues({
      ...values,
      filter,
    });
    toggle();
  };
  return (
    <div>
      <form
        className="max-w-3xl p-10 mx-auto"
        onSubmit={handleAddNewCard}
        autoComplete="off"
      >
        <div className="flex items-center gap-x-5">
          <FormGroup>
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              placeholder="Enter the title"
              onChange={onChange}
              required
              value={values.title}
            />
          </FormGroup>
          <FormGroup>
            <Label>Filter</Label>
            <Dropdown
              show={showFilter}
              onClick={toggle}
              placeholder={values.filter || "Select filter"}
            >
              {filterList.map((item, index) => (
                <div
                  key={item.name}
                  className="p-3 capitalize rounded cursor-pointer hover:text-blue-500 hover:bg-slate-800"
                  onClick={() => handleSelectFilter(item.name)}
                >
                  {item.name}
                </div>
              ))}
            </Dropdown>
          </FormGroup>
        </div>
        <FormGroup>
          <Label>HTML</Label>
          <Textarea
            name="htmlCode"
            placeholder="Enter your HTML code here..."
            onChange={onChange}
            required
            value={values.htmlCode}
          ></Textarea>
        </FormGroup>
        <FormGroup>
          <Label>CSS</Label>
          <Textarea
            name="cssCode"
            placeholder="Enter your CSS code here..."
            onChange={onChange}
            required
            value={values.cssCode}
          ></Textarea>
        </FormGroup>
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Add new card</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardAddNew;
