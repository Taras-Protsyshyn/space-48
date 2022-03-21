export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || "3000", 10),
  jwtSecret: process.env.JWT_SECRET || "",
  mongo: {
    login: process.env.MONGO_LOGIN,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
  }
});
