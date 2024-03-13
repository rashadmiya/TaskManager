import { list, check, todo, home, user } from "./Icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Important!",
    icon: list,
    link: "/important",
  },
  {
    id: 3,
    title: "Incomplete",
    icon: todo,
    link: "/incomplete",
  },
  {
    id: 4,
    title: "Completed!",
    icon: check,
    link: "/completed",
  },
  {
    id: 5,
    title: "About Me",
    icon: user,
    link: "/aboutme",
  },
];

export default menu;
