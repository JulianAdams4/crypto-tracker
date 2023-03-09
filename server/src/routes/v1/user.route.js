const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

// Auto signin
router.post(
  '/auto',
  validate(userValidation.autoSigninUser),
  userController.autoSigninUser
);

module.exports = router;
