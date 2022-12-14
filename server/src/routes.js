const express = require("express");
require("dotenv").config();
const user = require("./admin/auth/index");
const practitionar = require("./practitionar/controller/practitionar");
/**
 * Contains public API routes for the application.
 */
const publicRouter = express.Router();
const protectedRouter = express.Router();

/**
 * GET /api
 */
publicRouter.get("/", (req, res) => {
  console.log(req.body);
  res.json({
    app: process.env.APP_NAME,
    apiVersion: process.env.APP_VERSION,
  });
});

publicRouter.use("/auth", user);
publicRouter.use("/practitionar", practitionar);
// protectedRouter.use("/")
module.exports = publicRouter;
