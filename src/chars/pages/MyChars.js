import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import CharList from '../components/CharList';
import Profile from '../../user/components/Profile';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import './MyChars.css';

const MyChars = () =>{
    const [loadedUserChars, setUserChars] = useState();
    const [loadedUser, setUser] = useState([{
        id: "",
        name: "",
        image:"",
        role:""
    }]);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const userId = useParams().userId;
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/chars/user/${userId}`);
                setUserChars(responseData.chars);
                const fetchedUser = await sendRequest(process.env.REACT_APP_BACKEND_URL+ `/users/${userId}`);
                setUser([{
                    id: fetchedUser.user.id,
                    name: fetchedUser.user.name,
                    image: fetchedUser.user.image,
                    role: fetchedUser.user.role
                }]);
            }catch(err){

            }
        }
        fetchData();
       
    },[sendRequest, userId]);


    const charDeletedHandler = deletedCharId =>{
        setUserChars(prevChars=> prevChars.filter(char => char.id !== deletedCharId));
    };


    return(
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
      <div className="my-chars">

      
        {!isLoading && loadedUser && <div className="profile-section">
    <Profile item={loadedUser} />
    <h2 className="starter-h2">My Chars</h2>

        </div>}
        <div>
        
        </div>
        

    
            
            {!isLoading && loadedUserChars &&        
            
            <CharList items={loadedUserChars} onDeleteChar={charDeletedHandler} />
         }   
         </div>

        </React.Fragment>
    
    )
}
export default MyChars;