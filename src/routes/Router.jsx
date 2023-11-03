import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Booking from "../pages/Booking";

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
          path: 'about',
          element: <About />,
        },
        {
          path: 'contact',
          element: <Contact />,
        },
        {
          path: 'services',
          element: <Services />,
        },
        {
          path: 'booking',
          element: <Booking />,
        },
      ],
  },
]);
export default router;