import Button from "components/button/Button";
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
          <Button type="submit">Update card</Button>
        </div>
      </form>
    </div>
  );
};

export default CardUpdate;
