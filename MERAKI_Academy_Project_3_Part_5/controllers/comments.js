const { query } = require("express");
const { pool } = require("../models/db");

// This function creates a new comment for a specific article
const createNewComment = (req, res) => {
  const article_id=req.params.id
 const commenter_id=req.token.userId
 const{comment}=req.body
 const values=[comment,commenter_id,article_id]
const query=`INSERT INTO comments(comment,commenter_id,article_id)VALUES($1,$2,$3) returning *`
pool.query(query,values)
.then((result)=>{
  res.status(201).json({
    success: true,
message: "The comment has been created successfully",
results:  result.rows
  })
})
.catch((err)=>{
  res.status(500).json({
    success: false,
message: "Server Error",
err: err.message
  })
})
   /**Res:

If no error occurred

Status code: 201
Return an object with the following keys:
success: true
message: "The comment has been created successfully"
results: the result
If an error occurred

Status code: 500
Return an object with 3 keys:
success: false
message: "Server Error"
err: error message */
};
// This function returns the comments
const getAllComments = (req, res) => {
  //TODO: write your code here
};
module.exports = {
  createNewComment,
  getAllComments,
};
