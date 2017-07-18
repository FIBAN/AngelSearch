interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'FkmXH36Dmm78f62O9JwuI1A0nSMpOiZF',
  CLIENT_DOMAIN: 'fiban.eu.auth0.com',
  AUDIENCE: 'daily-deals-api',
  REDIRECT: 'http://localhost:4200/callback',
  SCOPE: 'openid profile full_access'
};
