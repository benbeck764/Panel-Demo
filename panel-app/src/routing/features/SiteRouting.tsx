/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import { AppRoutes, RouteName } from "../common/routes";
import { AppPageLoader } from "@benbeck764/react-components";

const Home = lazy(() => import("../../features/home/Home"));
const Unity = lazy(() => import("../../features/unity/Unity"));

export const getSiteRoutes = (): RouteProps[] => [
  {
    path: AppRoutes[RouteName.Site].path,
    element: (
      <Suspense fallback={<AppPageLoader />}>
        <Outlet />
      </Suspense>
    ),
    children: (
      <>
        <Route
          index
          path={AppRoutes[RouteName.Site].path}
          element={<Home />}
        ></Route>
        <Route
          index
          path={AppRoutes[RouteName.Unity].path}
          element={<Unity />}
        ></Route>
        <Route
          index
          path={AppRoutes[RouteName.Dashboard].path}
          element={<Home />}
        ></Route>
        <Route
          index
          path="*"
          element={<Navigate to={AppRoutes[RouteName.Site].path} replace />}
        ></Route>
      </>
    ),
  },
];
