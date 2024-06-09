const frontend = process.env.FRONTEND;
export default {
  origin: frontend,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  redisCacheExpiresIn: 60,
};
