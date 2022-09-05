import { db } from "components/firebase/firebase-config";
import { userRole } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFetchCards({
  status = null,
  name = "",
  filter = "",
  count = 100,
  isManage = false,
}) {
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let colRef = collection(db, "cards");
        if (isManage && userInfo?.role === userRole.USER) {
          colRef = query(colRef, where("userId", "==", userInfo.uid));
        }
        let queries = query(colRef, orderBy("createdAt", "desc"), limit(count));
        if (status)
          queries = query(queries, where("status", "==", status), limit(count));
        if (name)
          queries = query(
            colRef,
            where("title", ">=", name),
            where("title", "<=", name + "utf8"),
            orderBy("title", "desc"),
            limit(count)
          );
        if (filter)
          queries = query(queries, where("filter", "==", filter), limit(count));
        const documentSnapshots = await getDocs(queries);
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        onSnapshot(colRef, (querySnapshot) => {
          setTotal(querySnapshot.size);
        });
        onSnapshot(queries, (querySnapshot) => {
          const results = [];
          querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setCards(results);
        });
        setLastDoc(lastVisible);
      } catch (err) {
        console.log(err);
        toast.error(err?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, name, status, count]);
  const handleLoadMore = async () => {
    setLoading(true);
    let colRef = collection(db, "cards");
    if (isManage && userInfo?.role === userRole.USER) {
      colRef = query(colRef, where("userId", "==", userInfo.uid));
    }
    let queries = query(
      colRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc || 0),
      limit(count)
    );
    if (status)
      queries = query(
        queries,
        startAfter(lastDoc || 0),
        where("status", "==", status),
        limit(count)
      );
    if (name)
      queries = query(
        colRef,
        where("title", ">=", name),
        where("title", "<=", name + "utf8"),
        orderBy("title", "desc"),
        startAfter(lastDoc || 0),
        limit(count)
      );
    if (filter)
      queries = query(
        queries,
        startAfter(lastDoc || 0),
        where("filter", "==", filter),
        limit(count)
      );
    const documentSnapshots = await getDocs(queries);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
    setLoading(false);
    onSnapshot(queries, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCards([...cards, ...results]);
    });
  };
  return {
    total,
    cards,
    isLoading: loading,
    lastDoc,
    handleLoadMore,
    isReachingEnd: total < cards.length || total < count,
  };
}
