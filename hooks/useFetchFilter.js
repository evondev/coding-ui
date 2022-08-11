import { db } from "components/firebase/firebase-config";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchFilter(status = null) {
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let colRef = collection(db, "filters");
      if (status) {
        colRef = query(colRef, where("status", "==", status));
      }
      onSnapshot(colRef, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setFilters(results);
      });
    }
    fetchData();
  }, []);
  return {
    filters,
  };
}
