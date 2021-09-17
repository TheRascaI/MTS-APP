import React from 'react';
import './PostSliderItem.css';
import Card from '../../shared/components/UIElements/Card';

const PostSliderItem = (props) => {

    return(
        <div className="post-slider-item">
        <Card className="post-slider-item-card">
        <h2>{props.title}</h2>
        <hr className="mts-hr"/>
        <p>{props.content}</p>
        </Card>
        </div>           
    )
}

export default PostSliderItem;
