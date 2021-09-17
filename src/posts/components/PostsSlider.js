import React from "react";
import Slider from "react-slick";
import './PostSlider.css';
import PostSliderItem from "./PostSliderItem";

const PostsSlider = (props) => {

  const settings = {
    dots:true,
    autoplay:true,
    arrows:false,
    speed:1500,
    autoplaySpeed:6000
  }

  const createPosts = (data, index) => {
    return(
      <PostSliderItem
        id={data.id}
        key={index}
        title={data.title}
        content={data.content}
        />
    )
  }

  return (
    <div className="posts-slider">
    <Slider {...settings}>
    {props.items.map(createPosts)}
    </Slider>

    </div>

  );
}
export default PostsSlider;