import React, { Component } from "react";
import HeroCarousel from "../../components/heroCarousel/HeroCarousel";
import SearchBox from "../../components/searchBox/SearchBox";
import Workers from "../../components/workers/Workers";
import Services from "../../components/services/Services";
import SmallModal from "../../components/smallModal/SmallModal";
// import "../../hiddenScrollBar.css";

export class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <HeroCarousel />
        </div>
        <div className="md:mx-[80px] mx-[15px] flex flex-col gap-5 items-center my-10">
          <h2 className="font-bold md:text-5xl text-2xl">
            Find your Daily work now
          </h2>
          <p className="md:text-xl  text-blue-600">
            We connect skilled labourers with contractors seeking their services
          </p>
        </div>
        <div>
          <SearchBox />
        </div>
        <div className="flex justify-center py-4">
          <Workers />
        </div>
        <SmallModal />
        <div className="sm:px-[60px] px-5 py-5">
          <h2 className="text-3xl font-bold pb-3 ">Our Services</h2>
          <div id="/#services" className=" flex overflow-x-auto  ">
            <Services />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
