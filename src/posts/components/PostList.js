import React from 'react';
import PostItem from './PostItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './PostList.css';

const PostList = props =>{  

    
     
        const createPosts = (data, index) =>{
          console.log("data:", data);
          return(
            
                <PostItem 
                    key={index}
                    id={data.id}
                    title={data.title}
                    content={data.content}
                    onDelete={props.onDeletePost}

                />
            )
        }
    
        return (
          <React.Fragment>
{props.items.length === 0 && <div className="post-list center">
            <Card>
              <h2>No posts found. Maybe create one?</h2>
              <Button to="/posts/new">Create Post</Button>
            </Card>
          </div>}

            <div className="post-list-container center">
      <ul className="post-list ">
      {props.items.map(createPosts)}
      </ul>
        </div>


          </React.Fragment>


)
    

    
    

}

export default PostList;