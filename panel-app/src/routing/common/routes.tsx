export enum RouteName {
  // Site Routes
  Site = "Site",
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
};
