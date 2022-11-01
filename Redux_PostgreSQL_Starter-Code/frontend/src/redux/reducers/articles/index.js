import { createSlice } from "@reduxjs/toolkit";
export const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        articles: [],
      
    },
    reducers: {
        setArticles: (state, action) => {
          console.log("action.payload",action.payload)
        state.articles = action.payload;
        
      },
      addArticle: (state, action) => {
        state.articles.push(action.payload)
      },
      updateArticle: (state, action) => {
        state.articles=state.articles.map((elem)=>{
         if( elem.id=action.payload.id)
{
  return{ ...elem,title:action.payload.title,description:action.payload.description}
}
return elem
        })
        
      },
      deleteArticle: (state, action) => {
        state.articles=state.articles.filter((elem)=>{
            return elem.id=action.payload
        })
        
    }
    },
  });
  
  export const {setArticles,addArticle,updateArticle,deleteArticle } = articlesSlice.actions;
  export default articlesSlice.reducer;
  