import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import DashboardPage from "../features/dashboard/DashboardPage";
import SettingsPage from "../features/settings/SettingsPage";

const Placeholder = ({ title }: { title: string }) => (
  <div style={{ padding: "24px", color: "#aaa" }}>
    <h1>{title}</h1>
    <p>Этот раздел ещё в разработке.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/skill-tree", element: <Placeholder title="Skill Tree" /> },
      { path: "/second-brain", element: <Placeholder title="Second Brain" /> },
      { path: "/english", element: <Placeholder title="English" /> },
      { path: "/creator", element: <Placeholder title="Creator" /> },
      { path: "/career", element: <Placeholder title="Career" /> },
      { path: "/finance", element: <Placeholder title="Finance" /> },
      { path: "/journal", element: <Placeholder title="Journal" /> },
      { path: "/music", element: <Placeholder title="Music" /> },
      { path: "/analytics", element: <Placeholder title="Analytics" /> },
      { path: "/calendar", element: <Placeholder title="Calendar" /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);