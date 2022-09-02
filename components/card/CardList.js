import { cardStatus } from "constant/global-constant";
import useFetchCards from "hooks/useFetchCards";
import React from "react";
import Card from "./Card";
import CardLoading from "./CardLoading";

const CardList = () => {
  const { cards, isLoading } = useFetchCards({ status: cardStatus.APPROVED });
  console.log("CardList ~ isLoading", isLoading);
  if (isLoading)
    return (
      <div
        className="grid grid-cols-1 gap-10 lg:grid-cols-3"
        aria-label="layout-grid-equals"
      >
        {Array(6)
          .fill(0)
          .map((item, index) => (
            <CardLoading key={index}></CardLoading>
          ))}
      </div>
    );
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
            author={card.author}
          ></Card>
        );
      })}
    </div>
  );
};

export default CardList;
