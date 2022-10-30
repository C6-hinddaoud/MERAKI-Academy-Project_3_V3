const express = require("express");

// Import roles controller
const {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
} = require("../controllers/roles");

// Create roles router
const roleRouter = express.Router();

/*
 * Testing Routes:
 * POST -> http://localhost:5000/roles/
 */

/*
 * Testing Object:
{
  "role": "USER",
}
/*
 * Testing Routes:
 * POST -> http://localhost:5000/roles/permission
 */
/*
{
  "permissions": "CREATE_ARTICLE"
}
*/
/*
 * Testing Routes:
 * POST -> http://localhost:5000/roles/role_permission/
/*

 * Testing Object:
{
  "role_id":1
  "permission_id":1
}
*/

roleRouter.post("/", createNewRole);
roleRouter.post("/permission", createNewPermission);
roleRouter.post("/role_permission", createNewRolePermission);
module.exports = roleRouter;
