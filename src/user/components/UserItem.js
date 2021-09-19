import React from 'react';
import Avatar from "../../shared/components/UIElements/Avatar";
import './UserItem.css';

const UserItem = props => {
 
    return(<div id={props.id} className="user-item">
         <div><Avatar image={process.env.REACT_APP_ASSETS_URL+`/${props.image}`} name={props.name} alt="Avatar" width="80px" height="80px" /></div>
        <div><p>id#{props.id}</p><h2>{props.name}</h2><p>Role: {props.role}</p></div>
    </div>
    )
}
export default UserItem;
