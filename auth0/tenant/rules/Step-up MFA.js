function guardianMultifactorStepUpAuthentication(user, context, callback) {
 // Enforce MFA on these operations
  function isSensitiveOperation() {
    const scopes =
      (context.request.query && context.request.query.scope) ||
      (context.request.body && context.request.body.scope);
    if (!scopes) {
      return false;
    }

    const sensitiveScopes = ['place:orders'];
    const requestedScopes = scopes.split(' ');
    return requestedScopes.some(scope => sensitiveScopes.includes(scope));
  }
  
  if (isSensitiveOperation()) {
    context.multifactor = {
      provider: 'any',
      allowRememberBrowser: false
    };
  }

  callback(null, user, context);
}