const express = require("express");
const {
  createNewComment,
  getAllComments,
} = require("./../controllers/comments");
// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
// Create comments router
const commentRouter = express.Router();

/*
 * Testing Routes:
 * POST -> http://localhost:5000/comments/1
/*

 * Testing Object:
{
  "comment":"Nice"
}
*/
commentRouter.post("/:id",authentication,authorization("CREATE-COMMENT"), createNewComment);
commentRouter.get("/", getAllComments);
module.exports = commentRouter;
