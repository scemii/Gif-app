const monk = require("monk");

const dbURI =
  "localhost/messageBoard";

const db = monk(dbURI);

module.exports = db;
