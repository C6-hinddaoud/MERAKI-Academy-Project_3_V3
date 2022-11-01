import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
//import { AuthContext } from "../../contexts/authContext";
import {setArticles,addArticle,updateArticle,deleteArticle } from "../../redux/reducers/articles"
import {setComments,addComment } from "../../redux/reducers/comments"
//===============================================================

const Dashboard = () => {
  const dispatch=useDispatch()
  //const { token, userId } = useContext(AuthContext);
  //const [articles, setArticles] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [articleId, setArticleId] = useState(false);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const auth=useSelector((state)=>{
    return{
      auth:state.auth.isLoggedIn
    }
    
    })
    const userId=useSelector((state)=>{
      return{
        userId:state.auth.userId
      }
      
      })
      const token=useSelector((state)=>{
        return{
          token:state.auth.token
        }
        
        })

        const Articles=useSelector((state)=>{
          return{
            Articles:state.articles.articles
          }
          
          })
  //===============================================================
  const getAllArticles = async () => {

    console.log(Articles)

    try {
      const result = await axios.get("http://localhost:5000/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        dispatch(setArticles(result.data.result));
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

  const handleUpdateClick = (article) => {
    setUpdateBox(!updateBox);
    setArticleId(article.id);
    setTitle(article.title);
    setDescription(article.description);
    if (updateBox) updateArticle(article.id);
  };

  //===============================================================

  const updateArticle = async (id) => {
    try {
      await axios.put(`http://localhost:5000/articles/${id}`, {
        title,
        description,


      })
      dispatch(updateArticle({id,title,description}))
      console.log(Articles)
      //getAllArticles();
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      //getAllArticles();
      dispatch(deleteArticle(id))
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================
  const getAllComments = async () => {
    try {
      const result = await axios.get("http://localhost:5000/comments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
       dispatch(setComments(result.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================
  const createComment = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/comments/${id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(createComment({comment}));
    } catch (error) {
      console.log(error.response);
    }
  };

  //===============================================================

  useEffect(() => {
    getAllArticles();
    getAllComments();
  }, []);

  //===============================================================

  return (
    <>
      <br />
      {Articles.length>0&& Articles.map((article, index) => (
        <div key={index} className="article">
          <div>{article.title}</div>
          <div>{article.description}</div>
          <div>
            {comments?.map((comment, i) => {
              if (comment.article_id === article.id) {
                return (
                  <p className="comment" key={i}>
                    {comment.comment}
                  </p>
                );
              }
            })}
          </div>
          {article.author_id === parseInt(userId) && (
            <>
              {updateBox && articleId === article.id && (
                <form>
                  <br />
                  <input
                    type="text"
                    defaultValue={article.title}
                    placeholder="article title here"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />

                  <textarea
                    placeholder="article description here"
                    defaultValue={article.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </form>
              )}
              <button
                className="delete"
                onClick={() => deleteArticle(article.id)}
              >
                X
              </button>
              <button
                className="update"
                onClick={() => handleUpdateClick(article)}
              >
                Update
              </button>
            </>
          )}
          <div>
            <textarea
              className="commentBox"
              placeholder="comment..."
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              className="commentBtn"
              onClick={() => {
                if (comment) createComment(article.id);
              }}
            >
              Add comment
            </button>
          </div>
        </div>
      ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
