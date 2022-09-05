import IconFilters from "./../components/icons/IconFilters";
import IconUsers from "./../components/icons/IconUsers";
import IconCards from "./../components/icons/IconCards";
export const filterItems = [
  "All",
  "Button",
  "Input",
  "Loading",
  "Toggle",
  "Dropdown",
  "Card",
  "Breadcrumbs",
  "Pagination",
  "Table",
  "Timeline",
];
export const menus = [
  {
    title: "Dashboard",
    icon: <IconCards />,
    link: "/manage/cards",
  },
  {
    title: "Members",
    icon: <IconUsers />,
    link: "/manage/users",
  },
  {
    title: "Filters",
    icon: <IconFilters />,
    link: "/manage/filters",
  },
];
export const cardStatus = {
  APPROVED: 1,
  PENDING: 2,
  REJECTED: 3,
};
export const filterStatus = {
  APPROVED: true,
  REJECTED: false,
};
export const userStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};
export const userRole = {
  USER: "USER",
  MOD: "MOD",
  ADMIN: "ADMIN",
};
export const DATA_PER_PAGE = 10;
