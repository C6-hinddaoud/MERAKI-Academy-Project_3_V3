const pool = require("../models/db");

const createNewComment = (req, res) => {
  const article_id = req.params.article_id;
  const commenter_id = req.token.userId;

  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, commenter_id, article_id) VALUES ($1,$2,$3) RETURNING *`;
  const data = [comment, commenter_id, article_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        massage: "The comment has been created",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
        err: err,
      });
    });
};

const getAllComment = (req, res) => {
  const query = `SELECT comments.*,users.firstName FROM comments INNER JOIN users ON comments.commenter_id = users.id ORDER By comments.id`;
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          massage: "No comments yet",
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `All comments`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    });
};

module.exports = {
  createNewComment,
  getAllComment,
};
