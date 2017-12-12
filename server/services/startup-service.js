"use strict";
const Startup = require('../daos/startup');
const assert = require("assert");
const VError = require('verror').VError;

const startupNotFoundError = (startupId) => new VError({
        name: 'STARTUP_NOT_FOUND',
        info: {startupId: startupId}
    }, `no startup found with id "${startupId}"`
);

const startupInvalidLeadAngelIdError = (leadAngelId) => new VError({
        name: 'STARTUP_INVALID_LEAD_ANGEL',
        info: {leadAngelId: leadAngelId}
    }, `no angel found with id "${leadAngelId}"`
);

module.exports.listAllStartups = async () => {
    try {
        return await Startup.all();
    } catch (err) {
        throw new VError(err, 'failed to get startups');
    }
};

module.exports.getStartupById = async (startupId) => {
    let startup;
    try {
        startup = await Startup.get(startupId);
    } catch (err) {
        throw new VError(err, 'failed to get startup');
    }
    if(!startup) throw startupNotFoundError(startupId);
    return startup;
};

module.exports.createStartup = async (startup) => {
    try {
        startup.status = startup.status || 'active';
        return await Startup.create(startup);
    } catch (err) {
        switch (err.code) {
            case '23503': //Foreign key constraint violation
                switch (err.constraint) {
                    case 'startups_lead_angel_id_fkey':
                        throw startupInvalidLeadAngelIdError(startup.lead_angel_id);
                        break;
                    default:
                        throw new VError(err, 'failed to create new startup');
                }
                break;
            default:
                throw new VError(err, 'failed to create new startup');
        }
    }
};

module.exports.updateStartup = async (changes) => {
    assert.equal(typeof (changes.id), 'string', 'startup id must be defined');

    let updatedStartup;
    try {
        updatedStartup =  await Startup.update(changes);
    } catch (err) {
        switch (err.code) {
            case '23503': //Foreign key constraint violation
                switch (err.constraint) {
                    case 'startups_lead_angel_id_fkey':
                        throw startupInvalidLeadAngelIdError(changes.lead_angel_id);
                        break;
                    default:
                        throw new VError(err, 'failed to update startup');
                }
                break;
            default:
                throw new VError(err, 'failed to update startup');
        }
    }
    if(!updatedStartup) throw startupNotFoundError(changes.id);
    return updatedStartup;
};

module.exports.deleteStartup = async (startupId) => {
    let rowsDeleted;
    try {
        rowsDeleted = await Startup.delete(startupId);
    } catch (err) {
        throw new VError(err, 'failed to delete startup');
    }
    if(!rowsDeleted) throw startupNotFoundError(startupId);
};