import React from "react";
import { Slide } from "react-slideshow-image";

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,

  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  },
};
const slideImages = [
  `https://www.urbanlivingdesigns.in/assets/images/urbanliving/u1-copy.jpg`,
  `https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?cs=srgb&dl=architecture-buildings-cars-1034662.jpg&fm=jpg`,
  `https://images.jdmagicbox.com/comp/durgapur/w8/9999px343.x343.160802185947.e5w8/catalogue/finite-spaces-bidhannagar-durgapur-interior-designers-0v7gfrkkfh.jpg`,
];
const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide {...properties}>
        <div className="each-slide">
          <div
            style={{ backgroundImage: `url(${slideImages[0]})`, position: "" }}
          >
            <div className="outterDiv">
              {" "}
              <span className="tdt">Conservation</span>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[1]})` }}>
            <span>Open court awesome project</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[2]})` }}>
            <span>Open court awesome project</span>
            <div className="outterDiv">
              <span className="tdt">Conservation</span>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Slideshow;
