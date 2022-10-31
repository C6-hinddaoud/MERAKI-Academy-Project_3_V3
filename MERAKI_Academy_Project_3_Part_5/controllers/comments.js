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

};
// This function returns the comments
const getAllComments = (req, res) => {
const query=`select comments.id,comments.article_id,comments.commenter_id,comments.is_deleted,comments.comment  ,users.firstname,USERS.id from COMMENTS INNER JOIN users ON
comments.commenter_id=users.id
 WHERE comments.is_deleted=0`
pool.query(query)
.then((result)=>{
if(result.rows.length==0){
 return res.status(401).json({
    success: true,
message: "ther is no comments",

  })
}

  res.status(200).json({
    success: true,
message: "All comments",
comments:result.rows
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
Status code: 200
Return an object with 3 keys:
success: true
message: "All comments"
comments: the found comments
If an error occurred
Status code: 500
Return an object with 3 keys:
success: false
message: "Server Error"
err: error message
 */

};
module.exports = {
  createNewComment,
  getAllComments,
};
