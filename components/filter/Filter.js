import useFetchFilter from "hooks/useFetchFilter";
import React from "react";

const FilterMenu = () => {
  const [activeCard, setActiveCard] = React.useState("all");
  const { filters: filterItems } = useFetchFilter(true);
  const handleFilterCard = (item) => {
    setActiveCard(item);
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.display =
        card.getAttribute("data-filter") === item || item === "all"
          ? "flex"
          : "none";
    });
  };
  return (
    <div
      className="flex mb-10 overflow-x-auto text-lg font-medium border-b gap-x-5 whitespace-nowrap border-b-slate-800 hidden-scroll"
      aria-label="tab-v4"
    >
      <FilterItem
        item={{
          name: "all",
        }}
        onClick={() => handleFilterCard("all")}
        activeCard={activeCard === "all"}
      ></FilterItem>
      {filterItems.map((item) => (
        <FilterItem
          key={item.name}
          onClick={() => handleFilterCard(item.name)}
          activeCard={activeCard === item.name}
          item={item}
        ></FilterItem>
      ))}
    </div>
  );
};

function FilterItem({ item, activeCard, onClick }) {
  return (
    <div
      key={item}
      className={`flex items-center py-3 font-medium cursor-pointer gap-x-2 capitalize text-sm lg:text-base ${
        activeCard
          ? "text-transparent bg-gradient-primary bg-clip-text border-b-2 border-third pointer-events-none"
          : "text-slate-300"
      }`}
      onClick={onClick}
    >
      {item.name}
    </div>
  );
}

export default FilterMenu;
