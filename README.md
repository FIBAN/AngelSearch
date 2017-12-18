# Business Angel Search

The purpose of this application is to help members of the angel network to find other members.

## Architecture

### System Context

![Business Angel Search - System context](docs/system-context.png)

Angel Search stores data about the angels, startups, and links to viewable documents in its database. Authentication
and Authorization is delegated to [Auth0](https://auth0.com/).

### Container Context

![Business Angel Search - Container context](docs/container-context.png)

The system is divided mainly into two parts: the AngularJS front-end and NodeJS back-end.
The NodeJS back-end provides the front-end angel data through a rest-like API. 
The data is stored in a PostgreSQL database except the user credential and role information which is stored in the Auth0 service.
Authentication of users is done based on access tokens issued by Auth0.

## Deployment

### Local Development

The local deployment needs three components: Front-End, Back-End and the PostgreSQL database.
Also currently even local development environment uses Auth0 for authentication and it's recommended to create a separate
development/testing tenant on Auth0 instead of using the production tenant. In the future it could be worth it to create
a local replacement for Auth0 but no such replacement exists at the time of writing.

#### PostgreSQL Database
PostgreSQL database requires a table schema matching the one produced by the `create-schema.sql` script in `server/scripts` directory.

#### Back-End Server
Back-End requires the Auth0 credentials and database connection url provided as environmental variables. A `.env` file
can be placed inside the `server` directory to specify the variables. Here is the list of variables expected.

__Expected Environmental Variables:__

| Variable Name | Required | Description |
| --- | --- | --- |
| `AUTH0_CLIENTID`          | Yes | ClientID of a Auth0 non-interactive client with access to the managementAPI |
| `AUTH0_SECRET`            | Yes | Secret of a Auth0 non-interactive client with access to the managementAPI   |
| `AUTH0_DOMAIN`            | Yes | Auth0 domain                                                                |
| `AUTH0_AUDIENCE`          | Yes | Auth0 audience                                                              |
| `DATABASE_URL`            | Yes | PostgreSQL connection URL _ex. postgresql://user:password@host:port/schema_ |
| `PORT`                    | No  | The port on which the server is started. Default is `3001`.                 | 
| `AUTH0_TESTUSER_USERNAME` | No  | Admin user username saved in the auth0 database for integration testing     |
| `AUTH0_TESTUSER_PASSWORD` | No  | Admin user password saved in the auth0 database for integration testing     |
  
After defining the environmental variables the server can be started in dev mode by running the command `npm run dev` in 
`server` directory.

#### Front-End
Front-end can be configured with the environment files in the `frontend/src/environments` directory.

Front-end can be started in the development mode with the `npm start` command. The command needs to be run in the `frontend` directory.

### Production Deployment

TBA



