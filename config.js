module.exports = {
  DATABASE_URL:
    "mongodb+srv://admin:admin@webclass-qgmrz.mongodb.net/finalweb?retryWrites=true&w=majority",
  PORT: 80,
  SECRET_TOKEN: process.env.SECRET_TOKEN || "1234",
};
