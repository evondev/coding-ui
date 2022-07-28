import { filterItems } from "constant/global-constant";
import React from "react";

const FilterMenu = () => {
  const [activeCard, setActiveCard] = React.useState("All");
  const handleFilterCard = (item) => {
    setActiveCard(item);
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.display =
        card.getAttribute("data-filter") === item || item === "All"
          ? "flex"
          : "none";
    });
  };
  return (
    <div
      className="flex mb-10 overflow-x-auto text-lg font-medium border-b gap-x-5 whitespace-nowrap border-b-slate-800"
      aria-label="tab-v4"
    >
      {filterItems.map((item) => (
        <div
          key={item}
          className={`flex items-center py-3 font-medium cursor-pointer gap-x-2 ${
            activeCard === item
              ? "text-blue-500 border-b-2 border-blue-500 pointer-events-none"
              : "text-slate-300"
          }`}
          onClick={() => handleFilterCard(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default FilterMenu;
