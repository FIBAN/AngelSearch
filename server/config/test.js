'use strict';

module.exports = {
    env: 'test',
    db: 'postgresql://hanzki@localhost:5432/angel_search_test',
    port: process.env.PORT || 3001,
    auth0: {
        clientId: process.env.AUTH0_CLIENTID,
        secret: process.env.AUTH0_SECRET,
        domain: process.env.AUTH0_DOMAIN,
        audience: process.env.AUTH0_AUDIENCE,
        test_user: {
            username: process.env.AUTH0_TESTUSER_USERNAME,
            password: process.env.AUTH0_TESTUSER_PASSWORD
        }
    }
};