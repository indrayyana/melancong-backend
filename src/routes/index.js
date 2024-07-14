const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const destinationRoute = require('./destination.route');
const chatbotRoute = require('./chatbot.route');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to our API server. We recommend that you first register and login before accessing our endpoints.',
  });
});

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/destinations',
    route: destinationRoute,
  },
  {
    path: '/chatbot',
    route: chatbotRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
