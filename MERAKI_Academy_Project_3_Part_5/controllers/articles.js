const { query } = require("express");
const { pool } = require("../models/db");
// This function returns the articles
const getAllArticles = (req, res) => {
const query=`SELECT * FROM articles`
  pool.query(query)
  .then((articles) => {
    console.log(articles)
    if (articles.rows.length) {
      res.status(200).json({
        success: true,
        message: `All the articles`,
       
        articles: articles.rows,
       
      });
    } else {
      res.status(200).json({
        success: false,
        message: `No Articles Yet`,
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });
};

//This function returns articles by author
const getArticlesByAuthor = (req, res) => {

  let author_id = req.query.author;
  const query=`select * from articles where author_id=${author_id} AND is_deleted=0
  `
  pool.query(query)
  .then((articles) => {
    if (!articles.rows.length) {
      return res.status(404).json({
        success: false,
        message: `The author: ${author_id}} has no articles`,
      });
    }
    res.status(200).json({
      success: true,
      message: `All the articles for the author: ${author_id}}`,
      articles: articles.rows,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });



};

// This function returns article by its id
const getArticleById = (req, res) => {
  //TODO: write your code here

  let id = req.query.id;
  const query=`select * from articles where id=${id} AND is_deleted=0
  `
  pool.query(query)
  .then((result) => {
    if (!result.rows) {
      return res.status(404).json({
        success: false,
        message: `The article is not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `The article ${id} `,
      article: result.rows,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });

};

// This function creates new article
const createNewArticle = (req, res) => {

 const userId = req.token.userId;

  const{title,description}=req.body
  values=[title,description,userId]
  const query=`INSERT INTO articles(title,description,author_id)VALUES($1,$2,$3) returning *`

//console.log(userId)
//res.json(userId)

pool.query(query,values)

.then((article) => {
  res.status(201).json({
    success: true,
    message: `Article created`,
    article: article.rows,
  });
})
.catch((err) => {
  res.status(500).json({
    success: false,
    message: `Server Error`,
    err: err.message,
  });
});

};

// This function updates article by its id
const updateArticleById = (req, res) => {
  //TODO: write your code here
};

// This function deletes a specific article by its id
const deleteArticleById = (req, res) => {
  //TODO: write your code here
};

// This function deletes all the articles for a specific author
const deleteArticlesByAuthor = (req, res) => {
  //TODO: write your code here
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
