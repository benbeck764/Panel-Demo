import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions,
} from "@auth0/auth0-react";
import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate: FC<
  PropsWithChildren<Auth0ProviderOptions>
> = (props: PropsWithChildren<Auth0ProviderOptions>) => {
  const { children, ...auth0ProviderProps } = props;

  const navigate = useNavigate();

  const onRedirectCallback = async (appState: AppState | undefined) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (
    !(
      auth0ProviderProps.domain &&
      auth0ProviderProps.clientId &&
      auth0ProviderProps.authorizationParams?.redirect_uri
    )
  ) {
    return null;
  }

  return (
    <Auth0Provider
      {...auth0ProviderProps}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
