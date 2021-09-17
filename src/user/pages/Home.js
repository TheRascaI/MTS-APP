import React, { useEffect, useState, useContext } from 'react';
import MtsCalendar from '../../raids/components/MtsCalendar';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import PostsSlider from '../../posts/components/PostsSlider';
import Card from '../../shared/components/UIElements/Card';
import Lottie from 'react-lottie';
import animationData from '../../assets/anim-data/data.json';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from "../../shared/hooks/http-hook";
import './Home.css';
import RosterList from '../../chars/components/RosterList';
import Button from '../../shared/components/FormElements/Button';
const Home = () =>{
    const auth = useContext(AuthContext);

    const [loadedPosts, setLoadedPosts] = useState();
    const [loadedChars, setLoadedChars] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const startAnimationOptions = {
      loop:false,
      autoPlay:true,
      animationData: animationData,
      renderSettings:{
        preserveAspectRatio: 'xMidYMid slice'
      }
    };



    useEffect(()=>{
        const fetchData = async () => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+ "/posts");
                setLoadedPosts(responseData.posts);
                const charsData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/chars");
                setLoadedChars(charsData.chars);
    
            }catch(err){

            }
        };
        fetchData()

        
    },[sendRequest]);
    return (
      <React.Fragment>
       <ErrorModal error={error} onClear={clearError} />
{isLoading && (
  <div className="center">
    <LoadingSpinner asOverlay/>
  </div>
)}
        <div id="home" className="home-page">
             
        <div className="home-header">
        <h1 className="sr-only">MTS - EU Firemaw</h1>
        <div className="home-anim-container">
        {!isLoading && <Lottie options={startAnimationOptions}
                height={350}
                width={350}
                isStopped={false}
                isPaused={false}
        />    }    
        </div>
        
        </div>
        {!isLoading && loadedPosts &&  <div className="posts-section center">
        <h2 className="starter-h2" >News</h2>
        <PostsSlider items={loadedPosts} />
        {!isLoading && !loadedPosts && <Card><h2 style={{color:"black",margin:"0.25rem"}}>Sorry we can't find any posts atm. Please try again later.</h2></Card>} 
        </div>}

        {!isLoading &&<div className="raid-section">
        <h2 className="starter-h2" >Raids</h2>
         <MtsCalendar/>
        </div>}

        {!isLoading && loadedChars && <div className="roster-section">
        <div className="roster-section__container">
        <div className="roster-section__header">
        <h2 className="starter-h2">Roster</h2>
        </div>
          <div className="roster-list-container">
          {!isLoading && loadedChars && <RosterList items={loadedChars} />}
          </div>
          <div className="roster-section__footer">
         {!auth.isLoggedIn && <Button to={"/auth"} danger>Join our Team</Button>} 
          </div>
        </div>
        </div>}
        </div>

      </React.Fragment>
        )
}

export default Home;