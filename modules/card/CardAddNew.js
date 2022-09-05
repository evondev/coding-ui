import Button from "components/button/Button";
import CodeEditorBlock from "components/CodeEditorBlock";
import { db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import { cardStatus, userRole, userStatus } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
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
import CardAction from "./CardAction";
import CardFilterDropdown from "./CardFilterDropdown";

const CardAddNew = () => {
  const { userInfo } = useAuth();
  const [filterList, setFilterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    filter: "",
    htmlCode: "",
    cssCode: "",
    author: "",
  });
  const handleAddNewCard = (e) => {
    e.preventDefault();
    if (userInfo?.status === userStatus.INACTIVE) {
      toast.warning("Your account is not active, please contact admin");
      return;
    }
    const newValues = { ...values };
    delete newValues.author;
    const isAllInputFilled = Object.values(newValues).every((item) => {
      return item !== "";
    });
    if (!isAllInputFilled) {
      toast.error("Please fill all inputs");
      return;
    }
    setLoading(true);
    const colRef = collection(db, "cards");
    try {
      addDoc(colRef, {
        ...values,
        reason: "",
        status: cardStatus.PENDING,
        createdAt: serverTimestamp(),
        userId: userInfo?.uid,
        userFullname: userInfo?.fullname,
        userEmailAddress: userInfo?.email,
      });
      toast.success("Card added successfully and waiting for admin approval");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setValues({
        title: "",
        filter: "",
        htmlCode: "",
        cssCode: "",
        author: "",
      });
      setLoading(false);
    }
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
    <CardAction values={values}>
      <form onSubmit={handleAddNewCard} autoComplete="off">
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
            <CardFilterDropdown
              placeholder={values.filter || "Select filter"}
              onClick={toggle}
              onClickItem={handleSelectFilter}
              show={showFilter}
            ></CardFilterDropdown>
          </FormGroup>
        </div>

        <FormGroup>
          <Label>HTML</Label>
          <CodeEditorBlock
            name="htmlCode"
            onChange={onChange}
            code={values.htmlCode}
            language="html"
            placeholder="Enter your HTML code"
          ></CodeEditorBlock>
        </FormGroup>
        <FormGroup>
          <Label>CSS</Label>
          <CodeEditorBlock
            onChange={onChange}
            code={values.cssCode}
            language="css"
            placeholder="Enter your CSS code"
            name="cssCode"
          ></CodeEditorBlock>
        </FormGroup>
        <div className="flex items-center gap-x-5">
          <FormGroup>
            <Label>Author (optional)</Label>
            <Input
              name="author"
              type="text"
              placeholder="Enter the author(credit)"
              onChange={onChange}
              value={values.author}
            />
          </FormGroup>
        </div>
        <div className="mt-10 text-center">
          <Button isLoading={loading} type="submit" className="w-[200px]">
            Add new card
          </Button>
        </div>
      </form>
    </CardAction>
  );
};

export default CardAddNew;
