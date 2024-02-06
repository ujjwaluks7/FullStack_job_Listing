import React from "react";
import { servicesData } from "../../data/data";
import "../../hiddenScrollBar.css";
function Services() {
  return (
    <div>
      <div className="flex gap-10 overflow-auto">
        {servicesData?.map((service, i) => {
          return (
            <div
              className="flex flex-col items-center w-[250px] rounded-md p-4 bg-gray-200"
              key={i}
            >
              <div
                className="bg-orange-500 p-2"
                style={{ clipPath: "circle()" }}
              >
                <img
                  className="w-[150px] "
                  src={service.imgUrl}
                  alt=""
                  style={{ clipPath: "circle()" }}
                />
              </div>
              <p className="font-bold text-xl">{service.title}</p>
              <p className="italic">{service.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Services;
