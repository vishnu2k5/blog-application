const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      // ensure views don't accidentally see a stale user
      res.locals.user = undefined;
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      // make the authenticated user available to all views/templates
      res.locals.user = userPayload;
    } catch (error) {
      // if token verification failed, log the error for debugging
      // (don't throw here — we want requests from unauthenticated users to continue)
      console.error("Token validation failed:", error && error.message ? error.message : error);
      res.locals.user = undefined;
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
