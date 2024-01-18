"use strict";
const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@moviewatcher.l9cvehy.mongodb.net/What-Should-I-Play?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 8080;
const SESSION_SECRET = process.env.SESSION_SECRET;
const GOOGLE_CALLBACK = process.env.GOOGLE_CALLBACK
const GOOGLE_SECRET = process.env.GOOGLE_SECRET
const GOOGLE_ID = process.env.GOOGLE_ID
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
module.exports = {
  DATABASE_URL,
  PORT,
  IMGBB_API_KEY,
  SESSION_SECRET,
  GOOGLE_CALLBACK,
  GOOGLE_SECRET,
  GOOGLE_ID

};
//:warning:***NOTE: IF YOU CHANGE ENVIRONMENT VARIABLES, YOU ****MUST***** RESTART SERVER EVEN IF USING NODEMON:warning: