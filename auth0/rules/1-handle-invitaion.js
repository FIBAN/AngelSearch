function (user, context, callback) {
    console.log("Handling invitation if present. ENV=" + configuration.ENV);
    user.app_metadata = user.app_metadata || {};
    context.request = context.request || {};
    context.request.query = context.request.query || {};

    var API_URL = 'https://business-angel-search.herokuapp.com/api/auth0/register';

    // Skip if user has angel ID or if there is no invitation ID in the request
    if(user.app_metadata.angelId || !context.request.query.invitation_id) {
        console.log("Skipping invitation handling for user " + user.user_id);
        callback(null, user, context);
    }
    else {
        if(configuration.ENV === 'production') {
            // Try to accept the invitation
            acceptInvitation(context.request.query.invitation_id, user, function(err, angelId){
                if(!angelId) {
                    callback(new UnauthorizedError('Could not accept the invitation'));
                }
                else {
                    saveAngelIdToUserProfile(user, angelId, function(err) {
                        if (err) {
                            console.log('ERROR: saving angelId to the user profile', err);
                            callback(new UnauthorizedError('Could not update user profile'));
                        }
                        else callback(null, user, context);
                    });
                }
            });
        }
        else {
            // For testing and development use app provided invitation response if present
            if(context.request.query.test_invitation_response) {
                var angelId = context.request.query.test_invitation_response;
                saveAngelIdToUserProfile(user, angelId, function(err) {
                    if (err) {
                        console.log('ERROR: saving angelId to the user profile', err);
                        callback(new UnauthorizedError('Could not update user profile'));
                    }
                    else callback(null, user, context);
                });
            }
            else {
                callback(new UnauthorizedError(
                    'Could not accept the invitation: Invitation response override not provided in Dev environment'
                ));
            }
        }
    }

    function acceptInvitation(invitationId, user, cb) {
        request.post({
            url: API_URL,
            body: {auth0_id: user.user_id, invitation_id: invitationId},
            json: true
        }, function(error, response, body) {
            var statusCode = response && response.statusCode;
            if(error || statusCode !== 200) {
                console.log('ERROR: Accepting invitation "' +
                    invitationId +
                    '" returned ' +
                    statusCode, error);
                cb(error, null);
            }
            else {
                cb(null, body.angel_id);
            }
        });
    }

    function saveAngelIdToUserProfile(user, angelId, cb) {
        user.app_metadata.angelId = angelId;
        user.app_metadata.role = 'angel';
        auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
            .then(function(){
                console.log('saved angel id "' + angelId + '" for user ' + user.user_id);
                cb(null);
            })
            .catch(function(err){ cb(err); });
    }
}