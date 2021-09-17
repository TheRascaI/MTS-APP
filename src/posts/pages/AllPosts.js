import React,  { useState, useEffect} from "react";
// import "./Game.css";
import PostList from "../components/PostList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { useHttpClient } from "../../shared/hooks/http-hook";
import './AllPosts.css'

const AllPosts = () => {
    const [loadedPosts, setLoadedPosts] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();


  useEffect(() => {
    const fetchPosts = async () => {
  
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/posts");
        setLoadedPosts(responseData.posts);
      } catch (err) {
       
      }
    
    };
    fetchPosts();
  }, [sendRequest]);
  


  const postDeletedHandler = deletedPostId => {
    setLoadedPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay/>
        </div>
      )}
      {!isLoading && loadedPosts && <div className="post-list-main-container">
      <h2 className="starter-h2">All Posts</h2>
      <PostList items={loadedPosts}  onDeletePost={postDeletedHandler}/>
      </div>}
    </React.Fragment>
  );


   

     
      
     
    
    
}
export default AllPosts;