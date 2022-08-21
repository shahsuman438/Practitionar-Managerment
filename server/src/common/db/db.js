require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("./dbConfig");
const client = process.env.DB_CLIENT;

/**
 * Database connection.
 */
const connectionUrl = `${client}://${connection.host}:${connection.port}`;
mongoose.connect(connectionUrl, {
  dbName: connection.database,
  user: connection.user,
  pass: connection.password,
  useNewUrlParser: true,
  readPreference: "primaryPreferred",
  ssl: true,
});

const { connection: db } = mongoose;

db.on("connected", () => {
  console.log("Connection to mongoDB successful");
});

db.on("error", (error) => {
  console.error(error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
