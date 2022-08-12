import { db } from "components/firebase/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFetchCards({
  status = null,
  name = "",
  filter = "",
  count = 100,
}) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let colRef = collection(db, "cards");
        colRef = query(colRef, orderBy("createdAt", "desc"));
        if (status) {
          colRef = query(colRef, where("status", "==", status), limit(count));
        }
        if (name) {
          colRef = query(
            colRef,
            where("title", ">=", name),
            where("title", "<=", name + "utf8"),
            limit(count)
          );
        }
        if (filter) {
          colRef = query(colRef, where("filter", "==", filter), limit(count));
        }
        onSnapshot(colRef, (querySnapshot) => {
          const results = [];
          querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setCards(results);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
        toast.error(err?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter, name, status, count]);
  return {
    cards,
    isLoading: loading,
  };
}
