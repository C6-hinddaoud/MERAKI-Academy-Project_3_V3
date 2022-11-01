import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useSelector ,useDispatch} from "react-redux";
import{setLogin, setLogout, setUserId} from "../../redux/reducers/auth"
import { useNavigate } from "react-router-dom";
//import { AuthContext } from "../../contexts/authContext";

//===============================================================

const NavBar = () => {
  //const { logout } = useContext(AuthContext);
  const dispatch=useDispatch()
  const navg=useNavigate()
  const auth=useSelector((state)=>{
    return{
      auth:state.auth.isLoggedIn
    }
  })
  //===============================================================
const logout=()=>{
 dispatch(setLogout())
  navg("/login")
}
  return (
    <>
      <div className="NavBar">
        {auth? (
          <>
            <Link className="Link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="Link" to="/newArticle">
              Add New Article
            </Link>
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="Link" to="/">
              Register
            </Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </>
  );
};

export default NavBar;
