import { createBrowserRouter } from "react-router-dom";
import { 
    DashboardLayout,
    DefaultLayout 
} from "../layouts";
import { 
    About, 
    Contact, 
    EmailToVerify, 
    FollowManga, 
    HistoryManga, 
    Home, Login, 
    NotFound, 
    Policy, 
    Register, 
    SearchManga, 
    Terms, 
    NewPassword
} from "../pages";
import { path } from "../utils/constants";
import { DashboardChart, DashboardGem, DashboardInfo, DashboardManageManga, DashboardManageUser, DashboardManga, DashboardPassword } from "../components";

export const router = createBrowserRouter([
    {
        path: path.home,
        element: <DefaultLayout />,
        children: [
            {
                path: "",
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
            },
            {
                path: path.follow,
                element: <FollowManga />
            },
            {
                path: path.history,
                element: <HistoryManga />
            },
            {
                path: path.search,
                element: <SearchManga />
            },
            {
                path: path.dashboard_info,
                element: <DashboardLayout />,
                children: [
                    {
                        path: "",
                        element: <DashboardInfo />
                    },
                    {
                        path: path.dashboard_chart,
                        element: <DashboardChart />
                    },
                    {
                        path: path.dashboard_gem,
                        element: <DashboardGem />
                    },
                    {
                        path: path.dashboard_manage_manga,
                        element: <DashboardManageManga />
                    },
                    {
                        path: path.dashboard_manage_user,
                        element: <DashboardManageUser />
                    },
                    {
                        path: path.dashboard_manga,
                        element: <DashboardManga />
                    },
                    {
                        path: path.dashboard_change_password,
                        element: <DashboardPassword />
                    }
                ]
            },
            {
                path: path.verify_email,
                element: <EmailToVerify />
            },
            {
                path: path.reset_password,
                element: <NewPassword />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])