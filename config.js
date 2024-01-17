"use strict";
const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@moviewatcher.l9cvehy.mongodb.net/What-Should-I-Play?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 8080;
// const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET;
// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
module.exports = {
  DATABASE_URL,
  PORT,
  IMGBB_API_KEY,
};
//:warning:***NOTE: IF YOU CHANGE ENVIRONMENT VARIABLES, YOU ****MUST***** RESTART SERVER EVEN IF USING NODEMON:warning: