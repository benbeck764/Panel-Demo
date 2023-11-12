export enum RouteName {
  // Site Routes
  Site = "Site",
  Unity = "Unity",
  Dashboard = "Dashboard",
}

export type AppRoute = {
  path: string;
  displayName?: string;
  params?: string[];
};

export const AppRoutes: Record<RouteName, AppRoute> = {
  // Site Routes
  [RouteName.Site]: {
    path: "/",
  },
  [RouteName.Unity]: {
    path: "/unity",
  },
  [RouteName.Dashboard]: {
    path: "/dashboard",
  },
};
