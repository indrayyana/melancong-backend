import express from 'express';

import userRoute from './user.route.js';
import authRoute from './auth.route.js';
import destinationRoute from './destination.route.js';
import chatbotRoute from './chatbot.route.js';

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

export default router;
