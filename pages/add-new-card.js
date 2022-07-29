import Banner from "components/Banner";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Textarea from "components/textarea/Textarea";
import useInputChange from "hooks/useInputChange";
import React from "react";

const AddNewCardPage = () => {
  const [values, setValues] = React.useState({
    title: "",
    filter: "",
    htmlCode: "",
    cssCode: "",
  });
  const handleAddNewCard = (e) => {
    e.preventDefault();
    console.log(values);
  };
  const { onChange } = useInputChange(values, setValues);
  return (
    <div>
      <Banner></Banner>
      <form
        className="max-w-3xl p-10 mx-auto bg-slate-800"
        onSubmit={handleAddNewCard}
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
            <Input type="text" name="filter" placeholder="Enter the filter" />
          </FormGroup>
        </div>
        <FormGroup>
          <Label>HTML</Label>

          <Textarea
            name="htmlCode"
            placeholder="Enter your HTML code here..."
          ></Textarea>
        </FormGroup>
        <FormGroup>
          <Label>CSS</Label>
          <Textarea
            name="cssCode"
            placeholder="Enter your CSS code here..."
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
