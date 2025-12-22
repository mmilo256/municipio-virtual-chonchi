import 'dotenv/config';

export const config = {
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
  sessionSecret: process.env.SESSION_SECRET,
  cookieSecure: process.env.COOKIE_SECURE,
  oauth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    homeUrl: process.env.HOME_URL,
  },
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};
