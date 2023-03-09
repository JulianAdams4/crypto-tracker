const httpStatus = require('http-status');
const { verifyToken } = require('../services/token.service');
const { allowedAppIds } = require('../utils/Constants');

const getAuthorization = (req) =>
  req.headers.Authorization || req.headers.authorization;

const auth = (...requiredRights) => async (req, res, next) => {
  if (!req || !req.headers || !getAuthorization(req)) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'Not authorized' });
  }

  const token = getAuthorization(req).replace('Bearer ', '');
  const payload = await verifyToken(token);
  if (!payload) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'Invalid token' });
  }

  const verification =
    Array.isArray(requiredRights) && requiredRights.length
      ? requiredRights
      : allowedAppIds;
  if (!verification.includes(payload.sub)) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'App not found' });
  }

  next();
};

module.exports = auth;
