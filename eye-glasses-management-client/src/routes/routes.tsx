import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EyeGlasses from "../pages/dashboard/eyeGlass/EyeGlasses";
import SalesHistory from "../pages/dashboard/sales/SalesHistory";
import AddEyeGlass from "../pages/dashboard/eyeGlass/AddEyeGlass";
import EyeGlassesLayout from "../components/layout/EyeGlassesLayout";
import UpdateEyeGlass from "../pages/dashboard/eyeGlass/UpdateEyeGlass";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "dashboard",
                element: <EyeGlasses />,
            },
            {
                path: "eye-glasses",
                element: <EyeGlassesLayout />,
                children: [
                    {
                        path: "",
                        element: <EyeGlasses />,
                    },
                    {
                        path: "add",
                        element: <AddEyeGlass />,
                    },
                    {
                        path: "update/:id",
                        element: <UpdateEyeGlass />,
                    },
                    {
                        path: "duplicate/:id",
                        element: <UpdateEyeGlass />,
                    },
                ],
            },
            {
                path: "sales-history",
                element: <SalesHistory />,
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
]);

export default router;
