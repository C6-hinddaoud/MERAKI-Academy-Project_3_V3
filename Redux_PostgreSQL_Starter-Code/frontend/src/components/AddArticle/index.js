import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
//import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import {setArticles,addArticle,updateArticle,deleteArticle } from "../../redux/reducers/articles"
import {setComments,addComment } from "../../redux/reducers/comments"
import { useDispatch, useSelector } from "react-redux";

//import { AuthContext } from "../../contexts/authContext";

//===============================================================

const AddArticle = () => {
  //const { token, isLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
const dispatch=useDispatch()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================
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

  const createNewArticle = async (e) => {

    
    e.preventDefault();
    try {
      const article = {
        title,
        description,
      };
      const result = await axios.post(
        "http://localhost:5000/articles",
        article,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
dispatch(setArticles(article))
        
        setMessage("The article has been created successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //===============================================================

  useEffect(() => {
    if (!auth) {
      history("/dashboard");
    }
  });

  //===============================================================
  return (
    <>
      <form onSubmit={createNewArticle}>
        <br />
        <input
          type="text"
          placeholder="article title here"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="article description here"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <button>Create New Article</button>
      </form>
      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default AddArticle;
