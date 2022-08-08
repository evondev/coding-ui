import { db } from "components/firebase/firebase-config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchFilter() {
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "filters");
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
