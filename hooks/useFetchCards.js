import { db } from "components/firebase/firebase-config";
import { cardStatus } from "constant/global-constant";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchCards(status = cardStatus.APPROVED) {
  const [cards, setCards] = useState([]);
  // function isInvalidDoc(doc) {
  //   return doc.title !== "" && doc.status === cardStatus.APPROVED;
  // }
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "cards");
      onSnapshot(colRef, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setCards(results);
      });
    }
    fetchData();
  }, []);
  return {
    cards,
  };
}
