import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Booking from "../pages/Booking";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLayout from "../components/layouts/AdminLayout";
import AddService from "../pages/AddService";
import Check from "../pages/Check";
import Test from "../pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        // path:"/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AddService />,
      },
      {
        path: "check",
        element: <Check/>,
      },
      {
        path: "test",
        element: <Test/>,
      },
    ],
  },
]);
export default router;
