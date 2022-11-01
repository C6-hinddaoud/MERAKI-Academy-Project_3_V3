import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/auth";
import commentsSlice from "./reducers/comments";
import articlesSlice from "./reducers/articles";
export default configureStore({
reducer:{
   
    auth:authSlice,
    comments:commentsSlice,
    articles:articlesSlice


}
})