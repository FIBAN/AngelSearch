'use strict';

module.exports = {
    env: 'development',
    db: process.env.DATABASE_URL,
    port: process.env.PORT || 3001,
    auth0: {
        clientId: process.env.AUTH0_CLIENTID || throwMissingConfigError('auth0.clientId'),
        secret: process.env.AUTH0_SECRET || throwMissingConfigError('auth0.secret'),
        domain: process.env.AUTH0_DOMAIN || throwMissingConfigError('auth0.domain'),
        audience: process.env.AUTH0_AUDIENCE || throwMissingConfigError('auth0.audience')
    }
};

function throwMissingConfigError(configName) {
    throw `Missing configuration for ${configName}`;
}