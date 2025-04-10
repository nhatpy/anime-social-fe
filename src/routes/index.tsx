import { createBrowserRouter } from "react-router-dom";

import { path } from "../utils/constants";
import { AdminLayout, DashboardLayout, DefaultLayout } from "../layouts";
import {
  About,
  Contact,
  EmailToVerify,
  FollowManga,
  HistoryManga,
  Home,
  Login,
  NotFound,
  Policy,
  Register,
  SearchManga,
  Terms,
  NewPassword,
  VerifySuccess,
  MangaDetail,
  ChapterDetail,
  CreateManga,
  CreateChapter,
  MangaCreateDetail,
  TestWebSocket,
  EmailVerificationReminder,
  PaymentSuccess,
  ChapterCreateDetail,
} from "../pages";
import {
  DashboardCategory,
  DashboardChart,
  DashboardGem,
  DashboardInfo,
  DashboardManageManga,
  DashboardManageUser,
  DashboardManga,
  DashboardPassword,
} from "../components";

export const router = createBrowserRouter([
  {
    path: path.home,
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: path.about,
        element: <About />,
      },
      {
        path: path.contact,
        element: <Contact />,
      },
      {
        path: path.policy,
        element: <Policy />,
      },
      {
        path: path.terms,
        element: <Terms />,
      },
      {
        path: path.login,
        element: <Login />,
      },
      {
        path: path.register,
        element: <Register />,
      },
      {
        path: path.follow,
        element: <FollowManga />,
      },
      {
        path: path.history,
        element: <HistoryManga />,
      },
      {
        path: path.search,
        element: <SearchManga />,
      },
      {
        path: path.dashboard_info,
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <DashboardInfo />,
          },
          {
            path: path.dashboard_gem,
            element: <DashboardGem />,
          },
          {
            path: path.dashboard_manga,
            element: <DashboardManga />,
          },
          {
            path: path.dashboard_change_password,
            element: <DashboardPassword />,
          },
        ],
      },
      {
        path: path.verify_email,
        element: <EmailToVerify />,
      },
      {
        path: path.reset_password,
        element: <NewPassword />,
      },
      {
        path: path.verify_success,
        element: <VerifySuccess />,
      },
      {
        path: path.email_reminder,
        element: <EmailVerificationReminder />,
      },
      {
        path: path.manga_detail,
        element: <MangaDetail />,
      },
      {
        path: path.chapter_detail,
        element: <ChapterDetail />,
      },
      {
        path: path.create_manga,
        element: <CreateManga />,
      },
      {
        path: path.create_chapter,
        element: <CreateChapter />,
      },
      {
        path: path.manga_create_detail,
        element: <MangaCreateDetail />,
      },
      {
        path: path.create_chapter_detail,
        element: <ChapterCreateDetail />,
      },
      {
        path: path.payment_success,
        element: <PaymentSuccess />,
      },
      {
        path: "/test-websocket",
        element: <TestWebSocket />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <DashboardChart />,
      },
      {
        path: path.admin_manage_category,
        element: <DashboardCategory />,
      },
      {
        path: path.admin_manage_user,
        element: <DashboardManageUser />,
      },
      {
        path: path.admin_manage_manga,
        element: <DashboardManageManga />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
