import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../layouts";
import { Home, NotFound } from "../pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])