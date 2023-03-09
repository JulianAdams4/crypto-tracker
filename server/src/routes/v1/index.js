const express = require('express');
const httpStatus = require('http-status');
const userRoute = require('./user.route');
const cryptoRoute = require('./crypto.route');
const config = require('../../config/config');

const router = express.Router();

router.get('/ping', (req, res) => res.status(httpStatus.OK).json('ping'));

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/crypto',
    route: cryptoRoute,
  },
];

const developmentRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  developmentRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
