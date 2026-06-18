import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import DashboardPage from "../features/dashboard/DashboardPage";

const P = ({ title }: { title: string }) => (
  <div style={{ padding: 32 }}>
    <h1 style={{ color: "var(--text-primary)", fontSize: 28, fontWeight: 700 }}>{title}</h1>
    <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Coming soon.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/",            element: <DashboardPage /> },
      { path: "/dashboard",   element: <DashboardPage /> },
      { path: "/skill-tree",  element: <P title="Skill Tree" /> },
      { path: "/second-brain",element: <P title="Second Brain" /> },
      { path: "/english",     element: <P title="English" /> },
      { path: "/creator",     element: <P title="Creator" /> },
      { path: "/career",      element: <P title="Career" /> },
      { path: "/finance",     element: <P title="Finance" /> },
      { path: "/journal",     element: <P title="Journal" /> },
      { path: "/music",       element: <P title="Music" /> },
      { path: "/analytics",   element: <P title="Analytics" /> },
      { path: "/calendar",    element: <P title="Calendar" /> },
      { path: "/settings",    element: <P title="Settings" /> },
    ],
  },
]);