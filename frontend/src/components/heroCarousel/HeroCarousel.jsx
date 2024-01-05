import React from "react";
import { carouselImagesData } from "../../data/data";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function HeroCarousel() {
  return (
    <div className="z-0">
      <Carousel
        useKeyboardArrows={true}
        autoPlay="true"
        interval="4000"
        showThumbs={false}
        swipeable={true}
        emulateTouch={true}
        infiniteLoop={true}
      >
        {carouselImagesData.map((URL, index) => {
          return (
            <div key={index}>
              <img className="md:h-[450px]" src={URL} alt="" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
