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
import { ProtectedRoute } from "./ProtectedRoute";
import { ExceptAdminRoute } from "./ExceptAdminRoute";

export const router = createBrowserRouter([
  {
    path: path.home,
    element: (
      <ExceptAdminRoute>
        <DefaultLayout />
      </ExceptAdminRoute>
    ),
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
        element: (
          <ProtectedRoute role="USER">
            <FollowManga />
          </ProtectedRoute>
        ),
      },
      {
        path: path.history,
        element: (
          <ProtectedRoute role="USER">
            <HistoryManga />
          </ProtectedRoute>
        ),
      },
      {
        path: path.search,
        element: <SearchManga />,
      },
      {
        path: path.dashboard_info,
        element: (
          <ProtectedRoute role="USER">
            <DashboardLayout />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute role="USER">
            <CreateManga />
          </ProtectedRoute>
        ),
      },
      {
        path: path.create_chapter,
        element: (
          <ProtectedRoute role="USER">
            <CreateChapter />
          </ProtectedRoute>
        ),
      },
      {
        path: path.manga_create_detail,
        element: (
          <ProtectedRoute role="USER">
            <MangaCreateDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: path.create_chapter_detail,
        element: (
          <ProtectedRoute role="USER">
            <ChapterCreateDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: path.payment_success,
        element: (
          <ProtectedRoute role="USER">
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    ),
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
