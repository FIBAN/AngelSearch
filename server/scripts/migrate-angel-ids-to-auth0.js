'use strict';

const AuthenticationClient = require('auth0').AuthenticationClient;
const ManagementClient = require('auth0').ManagementClient;

const config = {
    domain: '',
    clientId: '',
    secret: ''
};

const angelIds = {
    'auth0_id': 'angel_id'
};

async function main() {
    console.log('starting execution');

    const client = await createClient();
    const clientInfo = await client.getClientInfo();

    if(clientInfo) {
        console.log(`Auth0 client initialized. Running ${clientInfo.name}@${clientInfo.version}`);
    }

    let currentPage = 0;
    const usersPerPage = 10;
    let usersUpdated = 0;
    let users = await client.getUsers({page: currentPage, per_page: usersPerPage});

    while (users && users.length > 0) {
        console.log(`processing page ${currentPage}. Number of results: ${users.length}`);
        for (const user of users) {
            if (angelIds[user.user_id]) {
                const userMetadata = user.app_metadata || {};
                if(userMetadata.role && userMetadata.angelId === angelIds[user.user_id]) {
                    console.log(`skipping user ${user.user_id} because the metadata is up to date`);
                }
                else {
                    console.log(`updating metadata for user ${user.user_id}`);
                    userMetadata.role = userMetadata.role || 'angel';
                    userMetadata.angelId = angelIds[user.user_id];
                    try {
                        await client.updateAppMetadata({id: user.user_id}, userMetadata);
                        await sleep(1000);
                        usersUpdated += 1;
                    } catch (err) {
                        console.error(`failed to update metadata for user ${user.user_id}`, err);
                    }
                }
            }

            if(!user.app_metadata || !user.app_metadata.angelId) {
                console.log(`user ${user.email} doesn't have an angel id`);
            }
        }
        currentPage += 1;
        try {
            users = await client.getUsers({page: currentPage, per_page: usersPerPage});
        } catch (err) {
            console.error(`failed to load page ${currentPage}`, err);
            users = [];
        }
    }

    console.log(`processing finished. Scanned ${currentPage} pages and updated metadata for ${usersUpdated} users`);
    console.log('That\'s all for tonight folks!');
}

function createClient() {
    const auth0 = new AuthenticationClient({
        domain: config.domain,
        clientId: config.clientId,
        clientSecret: config.secret,
    });

    return auth0.clientCredentialsGrant({
        audience: 'https://' + config.domain + '/api/v2/'
    }).then(response => {
        return new ManagementClient({
            token: response.access_token,
            domain: config.domain
        });
    }).catch(err => Promise.reject({error: "Couldn't get auth0 credentials", cause: err}));
}

function sleep(ms) {
    return new Promise(resolve => {setTimeout(resolve, ms)});
}

main();