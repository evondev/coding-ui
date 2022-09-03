import Button from "components/button/Button";
import { db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LayoutDashboard from "components/layout/LayoutDashboard";
import Toggle from "components/toggle/Toggle";
import { filterStatus, userRole } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateFilterPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { userInfo } = useAuth();
  const [values, setValues] = useState({
    name: "",
    status: filterStatus.REJECTED,
  });
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "filters", id);
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
  const [loading, setLoading] = useState(false);
  const { onChange } = useInputChange(values, setValues);
  const handleUpdateFilter = async (e) => {
    if (userInfo?.role !== userRole.ADMIN) {
      toast.error("This feature only for admin!");
      return;
    }
    e.preventDefault();
    try {
      setLoading(true);
      const docRef = doc(db, "filters", id);
      await updateDoc(docRef, {
        ...values,
      });
      toast.success("Update filter successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleStatus = () => {
    setValues({
      ...values,
      status: !values.status,
    });
  };
  return (
    <LayoutDashboard
      heading="Update filter"
      hasPermission={userInfo?.role === userRole.ADMIN}
      back="/manage/filters"
    >
      <div>
        <form
          className="max-w-3xl p-10 mx-auto"
          onSubmit={handleUpdateFilter}
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
            <Button
              disabled={loading}
              isLoading={loading}
              type="submit"
              className="w-[200px]"
            >
              Update filter
            </Button>
          </div>
        </form>
      </div>
    </LayoutDashboard>
  );
};

export default UpdateFilterPage;
