import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import side_image from "../../assets/images/login_image.jpg";
import dam1 from "../../assets/images/dam_img.jpg";
import dam2 from "../../assets/images/dam_image2.png";

const spanStyle = {
  padding: "20px",
  background: "rgba(0, 0, 0, 0.5)",
  color: "#ffffff",
  fontSize: "28px",
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "500",
  letterSpacing: "0.5px",
  minWidth: "100%",
  textAlign: "center",
  borderRadius: "8px",
  position: "absolute",
  bottom: "30px",
  left: "50%",
  transform: "translateX(-50%)",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "100vh",
  position: "relative",
};

const buttonStyle = {
  display: "flex",
  color: "rgb(10,179,156)",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "88px",
  background: "transparent",
  border: "none",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  cursor: "pointer",
  margin: "0 10px",
  transition: "background 0.3s",
  position: "absolute",
  top: "40%",
  transform: "translateY(-50%)",
  zIndex: 1,
};

const leftButtonStyle = {
  ...buttonStyle,
  left: "20px",
};

const rightButtonStyle = {
  ...buttonStyle,
  right: "20px",
};

const slideImages = [
  {
    url: side_image,
    caption:
      "The Chukha Hydropower Project is a 336 MW facility situated on the Wangchu River in Chukha, Bhutan, and remains active today.",
  },
  {
    url: dam1,
    caption:
      "Developed in a single phase, the project began construction in 1979 and reached commercial operation by 1986.",
  },
  {
    url: dam2,
    caption:
      "Empowering communities through sustainable hydropower insights for a greener future.",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container" style={{ height: "100vh" }}>
      <Slide
        prevArrow={<button style={leftButtonStyle}>&lt;</button>}
        nextArrow={<button style={rightButtonStyle}>&gt;</button>}
      >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <span style={spanStyle}>“{slideImage.caption}”</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
