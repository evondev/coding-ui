import Banner from "components/Banner";
import Button from "components/button/Button";
import { auth, db } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LayoutMain from "components/layout/LayoutMain";
import { userRole, userStatus } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import PageNotFound from "./404";

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
    const { email, password } = values;
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        userId: auth.currentUser.uid,
        fullname: values.name,
        email: values.email,
        password: values.password,
        status: userStatus.INACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      });
      toast.success("Create account successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return <PageNotFound></PageNotFound>;
  return (
    <LayoutMain title="Sign up Page">
      <div className="max-w-2xl mx-auto rounded-lg border-slate-800">
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
          <Button type="submit" className="w-full bg-gradient-primary">
            Sign up
          </Button>
        </form>
      </div>
    </LayoutMain>
  );
};

export default CreateAccountPage;
