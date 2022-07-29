import useFetchCards from "hooks/useFetchCards";
import React from "react";
import Card from "./Card";

const CardList = () => {
  const { cards } = useFetchCards();
  if (cards.length <= 0) return null;
  return (
    <div
      className="grid grid-cols-1 gap-10 lg:grid-cols-3"
      aria-label="layout-grid-equals"
    >
      {cards.map((card) => {
        return (
          <Card
            key={card.title}
            title={card.title}
            filter={card.filter}
            htmlCode={card.htmlCode}
            cssCode={card.cssCode}
          ></Card>
        );
      })}
    </div>
  );
};

export default CardList;
