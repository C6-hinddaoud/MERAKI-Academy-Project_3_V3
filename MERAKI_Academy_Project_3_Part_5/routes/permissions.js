
const express = require("express");
const { createpermissions } = require("../controllers/permissions");


// Import login controller


// Create login router
const permissionsRouter = express.Router();


permissionsRouter.post("/",createpermissions );

module.exports = permissionsRouter;
