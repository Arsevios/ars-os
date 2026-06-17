import { createBrowserRouter } from "react-router-dom";

const Dashboard = () => {
  return <h1>AI Operating System</h1>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);