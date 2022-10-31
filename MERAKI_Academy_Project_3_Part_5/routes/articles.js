const express = require("express");

// Import articles controllers
const {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require("../controllers/articles");

// Import comments controller

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const articleRouter = express.Router();

/*
 * Testing Routes:
 * GET - POST ->  http://localhost:5000/articles/
 * POST ->        http://localhost:5000/articles/22/comments/
 * GET  ->        http://localhost:5000/articles/search_1?author=2
 * GET  ->        http://localhost:5000/articles/search_2?id=2
 * PUT  ->        http://localhost:5000/articles/2
 * DELETE ->      http://localhost:5000/articles/2
 * DELETE ->      http://localhost:5000/articles/:id/author
 */

/*
 * Testing Objects:
 * Article: {
    "title":"Hello World",
    "description":"This is for testing",
}
*/

articleRouter.get("/", getAllArticles);
articleRouter.get("/search_1", getArticlesByAuthor);
articleRouter.get("/search_2", getArticleById);
articleRouter.post("/", authentication,authorization("CREATE-ARTICLE"), createNewArticle);//
articleRouter.put("/:id", updateArticleById);
articleRouter.delete("/:id", deleteArticleById);
articleRouter.delete("/:id/author", deleteArticlesByAuthor);

module.exports = articleRouter;
