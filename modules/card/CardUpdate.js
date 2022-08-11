import Button from "components/button/Button";
import CodeEditorBlock from "components/CodeEditorBlock";
import { db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Textarea from "components/textarea/Textarea";
import { cardStatus } from "constant/global-constant";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CardUpdate = ({ id }) => {
  const [values, setValues] = useState({
    title: "",
    filter: "",
    htmlCode: "",
    cssCode: "",
    status: cardStatus.APPROVED,
  });
  const { onChange } = useInputChange(values, setValues);
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "cards", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setValues({
          ...docSnap.data(),
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
      console.log(err.message);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <form
        className="max-w-3xl p-10 mx-auto"
        onSubmit={handleUpdateCard}
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
            <Input
              type="text"
              name="filter"
              placeholder="Enter the filter"
              onChange={onChange}
              required
              value={values.filter}
            />
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
