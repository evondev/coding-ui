import Button from "components/button/Button";
import Card from "components/card/Card";
import CodeEditorBlock from "components/CodeEditorBlock";
import Dropdown from "components/dropdown/Dropdown";
import { db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Textarea from "components/textarea/Textarea";
import { cardStatus } from "constant/global-constant";
// const CodeEditor = dynamic(() => "@uiw/react-textarea-code-editor");
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
import CardFilterDropdown from "./CardFilterDropdown";

const CardAddNew = () => {
  const [filterList, setFilterList] = useState([]);
  const [values, setValues] = useState({
    title: "",
    filter: "",
    htmlCode: "",
    cssCode: "",
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
        status: cardStatus.APPROVED,
        createdAt: serverTimestamp(),
      });
      toast.success("Card added successfully");
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
    <div className="max-w-3xl p-10 mx-auto">
      <Label className="mb-5">Preview</Label>
      <Card
        title={values.title}
        filter={values.filter}
        htmlCode={values.htmlCode}
        cssCode={values.cssCode}
        preview
      ></Card>
      <div className="mb-10"></div>
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
        <div className="mt-10 text-center">
          <Button type="submit">Add new card</Button>
        </div>
      </form>
    </div>
  );
};

export default CardAddNew;
