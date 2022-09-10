import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "./firebase/firebase-config";

const Heart = () => {
  const [likes, setLikes] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  useEffect(() => {
    const getLikes = async () => {
      const likesDoc = doc(db, "hearts", "count");
      const likesSnapshot = await getDoc(likesDoc);
      if (likesSnapshot.exists()) {
        setLikes(likesSnapshot.data().count);
      } else {
        setLikes(0);
      }
    };
    getLikes();
  }, []);
  const handleClickHeart = () => {
    if (likes > 100_000_000) {
      toast.warn("The database have reached the maximum likes");
      return;
    }
    setLiked(true);
    setLikes((likes) => likes + 1);
    const colRef = doc(db, "hearts", "count");
    updateDoc(colRef, { count: likes + 1 }, { merge: true });
    setTimeout(() => {
      setLiked(false);
    }, 500);
  };
  return (
    <div className="fixed z-50 flex flex-col items-center select-none gap-y-2 bottom-5 right-5">
      <span className="text-sm font-bold">{likes}</span>

      <div
        className={`flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer w-14 h-14 heart-animate text-primary ${
          liked ? "is-active" : ""
        }`}
        onClick={handleClickHeart}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Heart;
