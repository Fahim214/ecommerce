import React, { Component } from "react";
import Slider from "react-slick";
import banner from './banner'

export default class MultipleItems extends Component {
    render() {
        var settings = {
          dots: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
        };
    return (
      <div className="container-fluid mt-5" style={{width: "95%"}}>
        <Slider {...settings}>
            {banner.map(ban => (
                <>
                <a href={ban.url}>
                    <img className="w-100 px-2 slider" style={{borderRadius: 20}} src={ban.image} alt=""/>
                </a>
                </>
            ))}
        </Slider>
      </div>
    );
  }
}