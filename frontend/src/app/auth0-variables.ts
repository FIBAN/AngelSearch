import { environment } from "../environments/environment"

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'S7UnGqOFi58Ce2vKTl58KUESIfGl2GA1',
  CLIENT_DOMAIN: 'fiban.eu.auth0.com',
  AUDIENCE: 'https://angel-search/',
  REDIRECT: environment.host + '/callback',
  SCOPE: 'openid profile email'
};
