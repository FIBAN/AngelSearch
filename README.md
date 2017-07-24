#Business Angel Search

The purpose of this application is to help members of the angel network to find other members.

##System Context

![Business Angel Search - System context](docs/system-context.png)

Currently it's a  bit unclear where the userdata besides credentials should be stored. 
Two main options are either in an internal database or in Google Sheets for ease of access.

##Container Context

![Business Angel Search - Container context](docs/container-context.png)

The system is divided mainly into two parts: the AngularJS front-end and NodeJS back-end.
The NodeJS back-end provides the front-end angel data through a rest-like API. 
The data is stored in a SQLite backend except the user credential and role information which is stored in the Auth0 service.
Authentication between the front-end and back-end is done via Auth0 tokens.