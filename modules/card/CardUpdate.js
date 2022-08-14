import Button from "components/button/Button";
import CodeEditorBlock from "components/CodeEditorBlock";
import { db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Textarea from "components/textarea/Textarea";
import Toggle from "components/toggle/Toggle";
import { cardStatus } from "constant/global-constant";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import useToggle from "hooks/useToggle";
import pretty from "pretty";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cssbeautify from "cssbeautify";

import CardFilterDropdown from "./CardFilterDropdown";
import Card from "components/card/Card";

const CardUpdate = ({ id }) => {
  const [values, setValues] = useState({
    title: "",
    filter: "",
    htmlCode: "",
    cssCode: "",
  });
  const { onChange } = useInputChange(values, setValues);
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "cards", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setValues({
          ...docSnap.data(),
          htmlCode: pretty(docSnap.data().htmlCode),
          cssCode: cssbeautify(docSnap.data().cssCode, {
            indent: `  `,
            autosemicolon: true,
          }),
          id: docSnap.id,
        });
      }
    }
    fetchData();
  }, [id]);
  const handleUpdateCard = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "cards", id);
      await updateDoc(docRef, {
        ...values,
      });
      toast.success("Card updated successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleToggleStatus = () => {
    setValues({
      ...values,
      status:
        values.status === cardStatus.APPROVED
          ? cardStatus.REJECTED
          : cardStatus.APPROVED,
    });
  };
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
      <form onSubmit={handleUpdateCard} autoComplete="off">
        <FormGroup>
          <Label>Status</Label>
          <Toggle
            name="status"
            on={values.status === cardStatus.APPROVED ? true : false}
            onChange={handleToggleStatus}
          ></Toggle>
        </FormGroup>
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
          <Button type="submit">Update card</Button>
        </div>
      </form>
    </div>
  );
};

export default CardUpdate;
