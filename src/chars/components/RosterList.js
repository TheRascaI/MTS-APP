import React from "react";
import CharShortItem from "./CharShortItem";
import Slider from "react-slick";
import './RosterList.css';



const RosterList = props => {

    const settings = {
        dots: false,
        arrows:false,
        speed: 1500,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        vertical:true,
    };

    const createRoster = (data, index) => {
        return <CharShortItem
                    key={index}
                    id={data.id}
                    charName={data.name}
                    charClass={data.charClass}
                    spec={data.spec}
                    
        />
    }

    return(<div className="roster-list">
        <Slider {...settings}>
            {props.items.map(createRoster)}
        </Slider>
        

    </div>
      
    )
}

export default RosterList;