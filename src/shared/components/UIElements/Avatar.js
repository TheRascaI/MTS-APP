import React from 'react';

import './Avatar.css';

const Avatar = props => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image || `https://avatars.dicebear.com/api/initials/${props.name}.svg` }
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
