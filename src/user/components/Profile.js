import React from "react";
import UserItem from "./UserItem";
import './Profile.css';
const Profile = props =>{
    const createProfile = data =>{
        return <UserItem
            id={data.id}
            image={data.image}
            name={data.name}
            role={data.role}
        />
    }
    return(
        <div className="profile-container">
       {props.item.map(createProfile)}
        </div>
    );
}

export default Profile;