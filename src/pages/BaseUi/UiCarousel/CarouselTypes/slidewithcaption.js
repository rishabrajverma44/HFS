import React from "react";
import { UncontrolledCarousel } from "reactstrap";

// Carousel images
import img7 from "../../../../assets/images/small/img-7.jpg";
import img2 from "../../../../assets/images/small/img-2.jpg";
import img9 from "../../../../assets/images/small/img-9.jpg";
import dam_1 from "../../../../assets/images/dam_img.jpg";
import dam_2 from "../../../../assets/images/dam_image2.png";
import dam_3 from "../../../../assets/images/login_image.jpg";

const Slidewithcaption = () => {
  return (
    <React.Fragment>
      <UncontrolledCarousel
        interval={4000}
        items={[
          {
            caption: "First slide label",
            key: 1,
            src: img7,
          },
          {
            caption: "Second slide label",
            key: 2,
            src: img2,
          },
          {
            caption: "Third slide label",
            key: 3,
            src: img9,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default Slidewithcaption;
