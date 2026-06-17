import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gridTemplateRows: "64px 1fr",
        height: "100vh",
      }}
    >
      <div
        style={{
          gridColumn: "1 / 3",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Header />
      </div>

      <div
        style={{
          borderRight: "1px solid #ddd",
        }}
      >
        <Sidebar />
      </div>

      <main
        style={{
          padding: 24,
          overflow: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}