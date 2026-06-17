import { NavLink } from "react-router-dom";

const items = [
  ["Dashboard", "/"],
  ["Skill Tree", "/skill-tree"],
  ["Second Brain", "/second-brain"],
  ["English", "/english"],
  ["Creator", "/creator"],
  ["Career", "/career"],
  ["Finance", "/finance"],
  ["Journal", "/journal"],
  ["Music", "/music"],
  ["Analytics", "/analytics"],
  ["Calendar", "/calendar"],
  ["Settings", "/settings"],
];

export default function Sidebar() {
  return (
    <aside
      style={{
        padding: 20,
      }}
    >
      <h2>AI OS</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 30,
        }}
      >
        {items.map(([title, url]) => (
          <NavLink key={url} to={url}>
            {title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}