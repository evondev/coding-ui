import { db } from "components/firebase/firebase-config";
import { userRole } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchMembers(status = null) {
  const [members, setMembers] = useState([]);
  const { userInfo } = useAuth();
  useEffect(() => {
    async function fetchData() {
      let colRef = collection(db, "users");
      if (status) {
        colRef = query(colRef, where("status", "==", status));
      }
      onSnapshot(colRef, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setMembers(results);
      });
    }
    fetchData();
  }, [status]);
  return {
    members,
  };
}
