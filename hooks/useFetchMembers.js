import { db } from "components/firebase/firebase-config";
import { DATA_PER_PAGE } from "constant/global-constant";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchMembers(status = null, count = DATA_PER_PAGE) {
  const [members, setMembers] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    async function fetchData() {
      let colRef = collection(db, "users");
      colRef = query(colRef, limit(count));
      if (status) {
        colRef = query(colRef, where("status", "==", status), limit(count));
      }
      const documentSnapshots = await getDocs(colRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (querySnapshot) => {
        setTotal(querySnapshot.size);
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setMembers(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [status, count]);
  const handleLoadMore = async () => {
    let colRef = collection(db, "users");
    colRef = query(colRef, startAfter(lastDoc || 0), limit(count));

    if (status) {
      colRef = query(
        colRef,
        startAfter(lastDoc || 0),
        where("status", "==", status),
        limit(count)
      );
    }
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setMembers([...members, ...results]);
    });
    const documentSnapshots = await getDocs(colRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  return {
    members,
    handleLoadMore,
    isReachingEnd: total < members.length,
  };
}
