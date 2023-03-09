const Joi = require('joi');

const autoSigninUser = {
  body: Joi.object().keys({
    appId: Joi.string().required(),
  }),
};

const emptyBody = {
  body: Joi.object().keys({}),
};

module.exports = {
  autoSigninUser,
  emptyBody,
};
