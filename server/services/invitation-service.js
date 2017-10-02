"use strict";
const Invitation = require('../daos/invitation');
const Angel = require('../daos/angel');
const VError = require('verror').VError;

const invitationNotFoundError = (inviteId) => new VError({
        name: 'INVITATION_NOT_FOUND',
        info: {angelId: inviteId}
    }, `no invitation found with id "${inviteId}"`
);

const invitationWrongStatusError = (status, expectedStatus) => new VError({
        name: 'INVITATION_WRONG_STATUS',
        info: {status: status, expectedStatus: expectedStatus}
    }, `invitation status is incorrect. Expected "${expectedStatus}" but got "${status}"`
);

const invitationAuth0ConflictError = (auth0Id) => new VError({
        name: 'INVITATION_AUTH0_CONFLICT',
        info: {auth0Id: auth0Id}
    }, `auth0 id "${auth0Id}" is already linked to another angel`
);

module.exports.listAllInvitations = async () => {
    try {
        return await Invitation.all();
    } catch (err) {
        throw new VError(err, 'failed to get invitations');
    }
};

module.exports.listAllInvitationsByAngelId = async (angelId) => {
    try {
        return await Invitation.allByAngelId(angelId);
    } catch (err) {
        throw new VError(err, 'failed to get invitations for an angel');
    }
};

module.exports.getInvitationById = async (inviteId) => {
    let invitation;
    try {
        invitation = await Invitation.get(inviteId);
    } catch (err) {
        throw new VError(err, 'failed to get invitation');
    }
    if(!invitation) throw invitationNotFoundError(inviteId);
    return invitation;
};

module.exports.createNewInvitation = async (angelId) => {
    try {
        return await Invitation.create(angelId);
    } catch (err) {
        throw new VError(err, 'failed to create new invitation');
    }
};

module.exports.acceptInvitation = async (inviteId, auth0Id) => {
    let invitation;
    try {
        invitation = await Invitation.get(inviteId);
    } catch (err) {
        throw new VError(err, 'failed to get invitation');
    }

    if(!invitation) throw invitationNotFoundError(inviteId);
    if(invitation.status !== 'pending') throw invitationWrongStatusError(invitation.status, 'pending');

    try {
        await Angel.linkAuth0Id(invitation.angel_id, auth0Id);
        return await Invitation.markAccepted(inviteId);
    } catch (err) {
        switch (err.name) {
            case 'AUTH0_LINKING_EXISTS':
                throw invitationAuth0ConflictError(auth0Id);
                break;
            default:
                throw new VError(err, 'failed to accept invitation');
        }
    }
};