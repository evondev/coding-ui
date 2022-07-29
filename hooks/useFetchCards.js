import { db } from "../firebase/firebase-config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchCards() {
  const [cards, setCards] = useState([]);
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
