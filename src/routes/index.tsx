import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../layouts";
import { About, Contact, Home, Login, NotFound, Policy, Register, Terms } from "../pages";
import { path } from "../utils/constants";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: path.home,
                element: <Home />
            },
            {
                path: path.about,
                element: <About />
            },
            {
                path: path.contact,
                element: <Contact />
            },
            {
                path: path.policy,
                element: <Policy />
            },
            {
                path: path.terms,
                element: <Terms />
            },
            {
                path: path.login,
                element: <Login />
            },
            {
                path: path.register,
                element: <Register />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])