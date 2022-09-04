import Button from "components/button/Button";
import FormGroup from "components/form/FormGroup";
import FormRow from "components/form/FormRow";
import ImageUpload from "components/image/ImageUpload";
import Input from "components/input/Input";
import Label from "components/label/Label";
import LayoutDashboard from "components/layout/LayoutDashboard";
import React from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const handleSubmit = (e) => {
    toast.warning("This feature is not available yet.");
  };
  return (
    <LayoutDashboard heading="Update your information" hasPermission>
      <div className="mt-28 l-container">
        <ImageUpload></ImageUpload>
        <FormRow>
          <FormGroup>
            <Label>Fullname</Label>
            <Input placeholder="Enter your fullname" name="name"></Input>
          </FormGroup>
          <FormGroup>
            <Label>Username</Label>
            <Input placeholder="Enter your username" name="username"></Input>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email address"
              name="email"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Phone number</Label>
            <Input placeholder="Enter your phone number" name="phone"></Input>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              placeholder="Enter your confirm password"
              type="password"
              name="confirm_password"
            ></Input>
          </FormGroup>
        </FormRow>
        <Button
          onClick={handleSubmit}
          className="w-full max-w-[200px] mx-auto bg-gradient-primary !block"
        >
          Update profile
        </Button>
      </div>
    </LayoutDashboard>
  );
};

export default ProfilePage;
