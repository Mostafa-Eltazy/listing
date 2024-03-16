import React from 'react';
import Carousel from '../shared-components/Carousel';
import Headline from './Headline';
import OurStory from './UsSection';
import ProcessFlow from './ProcessFlow';

const carousleOptions = { dots: false, infinite: true, speed: 350, autoplaySpeed: 5000, slidesToShow: 1, slidesToScroll: 1, autoplay: true, arrows: false };

const LandingLayout = () => {
  return (
    <div>
      <Headline />
      <ProcessFlow />
      <Carousel classes="bg-blue-100" options={carousleOptions}>
        <p className="text-center font-serif text-3xl p-10 m-10">Discover your dream property with ease on our intuitive platform</p>
        <p className="text-center font-serif text-3xl p-10 m-10"> Sell your property hassle-free and reach thousands of potential buyers</p>
        <p className="text-center font-serif text-3xl p-10 m-10">Join our community of satisfied users and experience the future of real estate today</p>
      </Carousel>
      <OurStory />
    </div>
  );
};

export default LandingLayout;
