const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expired: process.env.JWT_EXPIRED_IN,
  },
  firebase: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  },
};

module.exports = config;
