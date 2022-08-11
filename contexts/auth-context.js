import { auth } from "components/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();
function AuthProvider(props) {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  const value = { userInfo, setUserInfo, loading };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
      setLoading(false);
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
