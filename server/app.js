require("dotenv").config();
require("./src/common/db/db");
const express = require("express");
const app = express();
const publicRouter = require("./src/routes");
const cookieParser=require('cookie-parser')
const APP_PORT =
  (process.env.NODE_ENV === "test"
    ? process.env.TEST_APP_PORT
    : process.env.APP_PORT) ||
  process.env.PORT ||
  "3000";
const APP_HOST = process.env.APP_HOST || "0.0.0.0";

app.set("port", APP_PORT);
app.set("host", APP_HOST);

app.use(express.json())
app.use(cookieParser())
// API Routes
app.use("/api", publicRouter);

app.listen(app.get("port"), app.get("host"), () => {
  console.log(
    `Server started at http://${app.get("host")}:${app.get("port")}/api`
  );
});
