function (user, context, callback) {
    console.log("Checking existing angel account. ENV=" + configuration.ENV);
    user.app_metadata = user.app_metadata || {};
    var API_URL = 'https://business-angel-search.herokuapp.com/api/auth0/angelid';

    // Skip if user is admin, has angel ID or hasn't verified his/her email
    if(hasAdminRole(user) || hasAngelId(user) || hasNotVerifiedEmail(user)){
        console.log("skipping angel checking for user " + user.user_id);
        callback(null, user, context);
    }
    else {
        if(configuration.ENV === 'production') {
            // Query wether or not a matching angel account exists for user email
            checkIfEmailMatchesAngel(user.email, function(err, angelId) {
                if(!angelId) {
                    callback(null, user, context);
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
            // For testing and development use app provided angelId response if present
            if(context.request.query.test_angel_id_response) {
                var angelId = context.request.query.test_angel_id_response;
                saveAngelIdToUserProfile(user, angelId, function(err) {
                    if (err) {
                        console.log('ERROR: saving angelId to the user profile', err);
                        callback(new UnauthorizedError('Could not update user profile'));
                    }
                    else callback(null, user, context);
                });
            }
            else {
                callback(null, user, context);
            }
        }
    }

    function hasAdminRole(user) {
        return user.app_metadata.role === 'admin';
    }

    function hasAngelId(user) {
        return !!user.app_metadata.angelId;
    }

    function hasNotVerifiedEmail(user) {
        return !user.email_verified;
    }

    function checkIfEmailMatchesAngel(email, cb) {
        request.get({
            url: API_URL,
            qs: {email: email},
            json: true
        }, function(error, response, body) {
            var statusCode = response && response.statusCode;
            if(error || statusCode !== 200) {
                if(error || statusCode !== 404) {
                    console.log('ERROR: Angel query for "' +
                        email +
                        '" returned ' +
                        statusCode, error);
                }
                cb(error, null);
            }
            else {
                cb(null, body.angelId);
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

