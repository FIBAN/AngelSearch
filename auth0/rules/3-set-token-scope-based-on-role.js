function (user, context, callback) {
    user.app_metadata = user.app_metadata || {};
    var namespace = 'https://angel-search';
    context.accessToken[namespace + '/role'] = user.app_metadata.role;
    context.idToken[namespace + '/role'] = user.app_metadata.role;
    context.accessToken[namespace + '/angelId'] = user.app_metadata.angelId;
    context.idToken[namespace + '/angelId'] = user.app_metadata.angelId;
    switch(user.app_metadata.role) {
        case 'admin':
            context.accessToken.scope = [
                'openid',
                'email',
                'profile',
                'read:angels',
                'read:startups',
                'read:documents',
                'read:profile',
                'read:invitations',
                'write:angels',
                'write:startups',
                'write:documents',
                'write:profile',
                'write:invitations'
            ];
            break;
        case 'angel':
            context.accessToken.scope = [
                'openid',
                'email',
                'profile',
                'read:angels',
                'read:startups',
                'read:documents',
                'read:profile',
                'write:profile'
            ];
            break;
        default:
            context.accessToken.scope = [
                'openid',
                'email',
                'profile'
            ];
    }
    callback(null, user, context);
}