import Button from "components/button/Button";
import { db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Toggle from "components/toggle/Toggle";
import { filterStatus, userRole } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import React, { useState } from "react";
import { toast } from "react-toastify";

const FilterAddNew = () => {
  const { userInfo } = useAuth();
  const [values, setValues] = useState({
    name: "",
    status: filterStatus.REJECTED,
  });
  const { onChange } = useInputChange(values, setValues);
  const handleAddNewFilter = (e) => {
    e.preventDefault();
    if (userInfo?.role !== userRole.ADMIN) {
      toast.error("This feature only for admin!");
      return;
    }
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
          <Toggle
            name="status"
            on={values.status}
            onChange={handleToggleStatus}
          ></Toggle>
        </FormGroup>

        <div className="mt-10 text-center">
          <Button type="submit">Add new filter</Button>
        </div>
      </form>
    </div>
  );
};

export default FilterAddNew;
