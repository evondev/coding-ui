import Banner from "components/Banner";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Textarea from "components/textarea/Textarea";
import { db } from "components/firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import React from "react";
import { toast } from "react-toastify";
import Head from "next/head";

const AddNewCardPage = () => {
  const [values, setValues] = React.useState({
    title: "",
    filter: "",
    htmlCode: "",
    cssCode: "",
  });
  const handleAddNewCard = (e) => {
    e.preventDefault();
    const colRef = collection(db, "cards");
    try {
      addDoc(colRef, {
        ...values,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      toast.error(err.message);
    }
    toast.success("Card added successfully");
  };
  const { onChange } = useInputChange(values, setValues);
  return (
    <div>
      <Head>
        <title>CodingUI - Add new Card UI</title>
      </Head>
      <Banner></Banner>
      <form
        className="max-w-3xl p-10 mx-auto bg-slate-800"
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
            />
          </FormGroup>
          <FormGroup>
            <Label>Filter</Label>
            <Input
              type="text"
              name="filter"
              placeholder="Enter the filter"
              onChange={onChange}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Label>HTML</Label>
          <Textarea
            name="htmlCode"
            placeholder="Enter your HTML code here..."
            onChange={onChange}
          ></Textarea>
        </FormGroup>
        <FormGroup>
          <Label>CSS</Label>
          <Textarea
            name="cssCode"
            placeholder="Enter your CSS code here..."
            onChange={onChange}
          ></Textarea>
        </FormGroup>
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
          >
            Add new card
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCardPage;
