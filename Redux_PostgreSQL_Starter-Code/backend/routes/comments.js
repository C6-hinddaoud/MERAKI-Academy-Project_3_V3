const express = require("express");

//controllers
const { createNewComment, getAllComment } = require("../controllers/comments");

//middleware
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post(
  "/:article_id",
  authentication,
  authorization("CREATE_COMMENT"),
  createNewComment
);
commentsRouter.get("/", authentication, getAllComment);

module.exports = commentsRouter;
