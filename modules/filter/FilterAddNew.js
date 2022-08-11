import Button from "components/button/Button";
import { db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import { filterStatus } from "constant/global-constant";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import React, { useState } from "react";
import { toast } from "react-toastify";

const FilterAddNew = () => {
  const [values, setValues] = useState({
    name: "",
    status: filterStatus.REJECTED,
  });
  const { onChange } = useInputChange(values, setValues);
  const handleAddNewFilter = (e) => {
    e.preventDefault();
    const isAllInputFilled = Object.values(values).every((item) => item !== "");
    if (!isAllInputFilled) {
      toast.error("Please fill all inputs");
      return;
    }
    const colRef = collection(db, "filters");
    try {
      addDoc(colRef, {
        ...values,
        name: values.name.toLowerCase(),
        createdAt: serverTimestamp(),
      });
      toast.success("Filter added successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setValues({
        name: "",
        status: filterStatus.REJECTED,
      });
    }
  };
  const handleToggleStatus = () => {
    setValues({
      ...values,
      status: !values.status,
    });
  };
  return (
    <div>
      <form
        className="max-w-3xl p-10 mx-auto"
        onSubmit={handleAddNewFilter}
        autoComplete="off"
      >
        <FormGroup>
          <Label>Name *</Label>
          <Input
            name="name"
            type="text"
            placeholder="Enter the name"
            onChange={onChange}
            required
            value={values.name}
          />
        </FormGroup>
        <FormGroup>
          <Label>Status</Label>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              name="status"
              onChange={handleToggleStatus}
              id=""
              className="hidden"
            />
            <span
              className={`transition-all rounded-full w-[100px] p-2 inline-block h-12 ${
                values.status ? "bg-blue-500" : "bg-slate-800"
              }`}
            >
              <span
                className={`transition-all inline-block w-8 h-8 bg-white rounded-full ${
                  values.status ? "translate-x-[52px]" : ""
                }`}
              ></span>
            </span>
          </label>
        </FormGroup>

        <div className="mt-10 text-center">
          <Button type="submit">Add new filter</Button>
        </div>
      </form>
    </div>
  );
};

export default FilterAddNew;
