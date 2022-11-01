const express = require("express");

//controllers
const {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
} = require("../controllers/role");

const roleRouter = express.Router();

roleRouter.post("/", createNewRole);
roleRouter.post("/permission", createNewPermission);
roleRouter.post("/role_permission", createNewRolePermission);
module.exports = roleRouter;
