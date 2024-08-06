import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="../../public/img/1.png" alt="Slide 1" />
        </div>
        <div>
          <img src="../../public/img/2.png" alt="Slide 2" />
        </div>
        <div>
          <img src="../../public/img/3.png" alt="Slide 3" />
        </div>
        {/* Agrega más imágenes según sea necesario */}
      </Slider>
    </div>
  );
};

export default ImageSlider;
