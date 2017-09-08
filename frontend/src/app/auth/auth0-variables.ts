import { environment } from "../../environments/environment"

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: environment.auth0.clientId,
  CLIENT_DOMAIN: environment.auth0.clientDomain,
  AUDIENCE: environment.auth0.audience,
  REDIRECT: environment.host + '/callback',
  SCOPE: 'openid profile email'
};
