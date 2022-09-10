import Button from "components/button/Button";
import { auth, db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LayoutMain from "components/layout/LayoutMain";
import { userRole, userStatus } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const CreateAccountPage = () => {
  const { userInfo } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (userInfo?.email) router.push("/manage/cards");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const isAllInputFilled = Object.values(values).every((item) => item !== "");
    if (!isAllInputFilled) {
      toast.error("Please fill all inputs");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        userId: auth.currentUser.uid,
        fullname: values.name,
        email: values.email,
        password: values.password,
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      });
      toast.success("Create account successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <LayoutMain title="Sign up Page" hideBanner>
      <div className="max-w-2xl py-10 mx-auto rounded-lg border-slate-800">
        <form onSubmit={handleSignUp} autoComplete="off">
          <FormGroup>
            <Label>Your name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={onChange}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter email address"
              name="email"
              onChange={onChange}
              required
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter the password"
              name="password"
              onChange={onChange}
              required
            ></Input>
          </FormGroup>
          <Button
            type="submit"
            className="w-full text-lg bg-gradient-primary button-effect"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </LayoutMain>
  );
};

export default CreateAccountPage;
