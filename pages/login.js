import Banner from "components/Banner";
import Button from "components/button/Button";
import { auth } from "components/firebase/firebase-config";
import FormGroup from "components/form/FormGroup";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LayoutMain from "components/layout/LayoutMain";
import { useAuth } from "contexts/auth-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import useInputChange from "hooks/useInputChange";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { userInfo } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (userInfo?.email) router.push("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <LayoutMain title="Login Page">
      <div className="text-center">
        <h1 className="inline-block mb-10 text-4xl font-bold text-center text-blue-500">
          Login to your account
        </h1>
      </div>
      <div className="max-w-2xl p-10 mx-auto border rounded-lg border-slate-200 dark:border-slate-800">
        <form onSubmit={handleLogin}>
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
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </LayoutMain>
  );
};

export default LoginPage;
