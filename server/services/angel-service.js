const Angel = require('../daos/angel');
const Invitation = require('../daos/invitation');
const logger = require('../helpers/logger');
const VError = require('verror').VError;

const angelNotFoundError = (angelId) => new VError({
        name: 'ANGEL_NOT_FOUND',
        info: {angelId: angelId}
    }, `no angel found with id "${angelId}"`
);

const angelEmailConflictError = (email) => new VError({
        name: 'DUPLICATE_ANGEL_EMAIL',
        info: {email: email}
    }, `email "${email}" is already in use`
);

module.exports.listAllAngels = async () => {
    try {
        return await Angel.all();
    } catch (err) {
        throw new VError(err, 'failed to get angels');
    }
};

module.exports.createNewAngel = async (angel) => {
    try {
        const newAngel = await Angel.create(angel);
        Invitation.create(newAngel.id)
            .catch(err =>
                logger().error('New Invite:', new VError(err, 'failed to create new invite'))
            );
        return newAngel;
    } catch (err) {
        switch (err.code) {
            case '23505': //Unique constraint violation
                switch (err.constraint) {
                    case 'angels_email_key':
                        throw angelEmailConflictError(angel.email);
                        break;
                    default:
                        throw new VError(err, 'failed to create new angel');
                }
                break;
            default:
                throw new VError(err, 'failed to create new angel');
        }
    }
};

module.exports.getAngelById = async (angelId) => {
    let angel;
    try {
        angel = await Angel.get(angelId);
    } catch (err) {
        throw new VError(err, 'failed to get angel');
    }
    if(!angel) throw angelNotFoundError(angelId);
    else return angel;
};

module.exports.updateAngel = async (changes) => {
    let angel;
    try {
        angel = await Angel.update(changes);
    } catch (err) {
        switch (err.code) {
            case '23505': //Unique constraint violation
                switch (err.constraint) {
                    case 'angels_email_key':
                        throw angelEmailConflictError(changes.email);
                        break;
                    default:
                        throw new VError(err, 'failed to update angel');
                }
                break;
            default:
                throw new VError(err, 'failed to update angel');
        }
    }
    if(!angel) throw angelNotFoundError(changes.id);
    else return angel;
};

module.exports.deleteAngel = async (angelId) => {
    let rowsDeleted;
    try {
        rowsDeleted = await Angel.delete(angelId);
    } catch (err) {
        throw new VError(err, 'failed to delete angel');
    }
    if(!rowsDeleted) throw angelNotFoundError(angelId);
};