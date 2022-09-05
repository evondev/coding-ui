import { useAuth } from "contexts/auth-context";
import React from "react";
import classNames from "utils/classNames";

const colors = ["#ffa400", "#fc6c8f", "#6a5af9", "#d66efd"];
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
const Avatar = ({ className = "", name = "T" }) => {
  const { userInfo } = useAuth();
  const newName =
    userInfo?.username?.split("")[0] || userInfo?.fullname?.split("")[0] || "C";
  const color = getRandomColor();
  return (
    <div
      className={classNames(
        "flex items-center justify-center font-bold rounded-full border-slate-500 uppercase",
        className
      )}
      style={{
        backgroundColor: color,
      }}
    >
      {newName}
    </div>
  );
};

export default Avatar;
