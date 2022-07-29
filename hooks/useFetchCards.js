import { useEffect, useState } from "react";

export default function useFetchCards() {
  const [cards, setCards] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("http://localhost:3002/cards");
  //     const data = await response.json();
  //     setCards(data);
  //   }
  //   fetchData();
  // }, []);
  return {
    cards,
  };
}
