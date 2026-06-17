import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header
      style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <h2>{location.pathname}</h2>

      <input
        placeholder="Search..."
        style={{
          width: 320,
          padding: 8,
        }}
      />

      <div>AI OS</div>
    </header>
  );
}