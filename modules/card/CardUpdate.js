import Button from "components/button/Button";
import CodeEditorBlock from "components/CodeEditorBlock";
import { db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Toggle from "components/toggle/Toggle";
import { cardStatus, userRole, userStatus } from "constant/global-constant";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import useToggle from "hooks/useToggle";
import pretty from "pretty";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cssbeautify from "cssbeautify";
import CardFilterDropdown from "./CardFilterDropdown";
import CardAction from "./CardAction";
import { useAuth } from "contexts/auth-context";

const CardUpdate = ({ id }) => {
  const { userInfo } = useAuth();
  const [values, setValues] = useState({
    title: "",
    filter: "",
    htmlCode: "",
    cssCode: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const { onChange } = useInputChange(values, setValues);
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "cards", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setValues({
          ...docSnap.data(),
          htmlCode: docSnap.data().htmlCode,
          cssCode: docSnap.data().cssCode,
          id: docSnap.id,
        });
      }
    }
    fetchData();
  }, [id]);
  const handleUpdateCard = async (e) => {
    e.preventDefault();
    if (userInfo?.status === userStatus.INACTIVE) {
      toast.warning("Your account is not active, please contact admin");
      return;
    }
    try {
      setLoading(true);
      const docRef = doc(db, "cards", id);
      await updateDoc(docRef, {
        ...values,
      });
      toast.success("Card updated successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
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
    <CardAction values={values}>
      <form onSubmit={handleUpdateCard} autoComplete="off">
        {userInfo?.role === userRole.ADMIN && (
          <>
            <div className="flex items-start justify-end">
              <FormGroup className="flex-none">
                <Label>Status</Label>
                <Toggle
                  name="status"
                  on={values.status === cardStatus.APPROVED ? true : false}
                  onChange={handleToggleStatus}
                ></Toggle>
              </FormGroup>
            </div>
            <FormGroup>
              <Label>Reject reason</Label>
              <Input
                name="reason"
                onChange={onChange}
                placeholder="Reject reason"
                value={values.reason}
              ></Input>
            </FormGroup>
          </>
        )}
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
            Update card
          </Button>
        </div>
      </form>
    </CardAction>
  );
};

export default CardUpdate;
