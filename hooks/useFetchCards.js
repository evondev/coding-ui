import { db } from "components/firebase/firebase-config";
import { cardStatus } from "constant/global-constant";
import {
  collection,
  endAt,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchCards(status = null, name = "", filter = "") {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let colRef = collection(db, "cards");
      if (status) {
        colRef = query(colRef, where("status", "==", status), limit(25));
      }
      if (name) {
        colRef = query(
          colRef,
          where("title", ">=", name),
          where("title", "<=", name + "utf8"),
          limit(25)
        );
      }
      if (filter) {
        colRef = query(colRef, where("filter", "==", filter), limit(25));
      }
      onSnapshot(colRef, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setCards(results);
      });
    }
    fetchData();
  }, [filter, name, status]);
  return {
    cards,
  };
}
