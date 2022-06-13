const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error(["⚠️  Couldn't find .env file  ⚠️", "ga ada env masbro!"]);
}

module.exports = {
  port: parseInt(process.env.PORT, 10),

  dbname: process.env.DATABASE_NAME,
  dbhost: process.env.DATABASE_HOST,
  dbuser: process.env.DATABASE_USER,
  dbpassword: process.env.DATABASE_PASSWORD,
  dbport: parseInt(process.env.DATABASE_PORT, 10),
};
