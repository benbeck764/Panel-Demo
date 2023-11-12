import { FC, ComponentType, PropsWithChildren } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { AppPageLoader } from "@benbeck764/react-components";

export const Auth0Guard: FC<PropsWithChildren<unknown>> = (
  props: PropsWithChildren<unknown>
) => {
  const { children } = props;
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  // If not authenticated, redirect to Auth0 login page
  if (!isAuthenticated) {
    const Component = withAuthenticationRequired(
      children as unknown as ComponentType,
      {
        onRedirecting: () => <AppPageLoader />,
        loginOptions: {
          appState: {
            returnTo: location.pathname,
          },
        },
      }
    );
    return <Component />;
  }

  return children;
};
