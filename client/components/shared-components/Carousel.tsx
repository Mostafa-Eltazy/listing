import React from 'react';
import Slider from 'react-slick';

interface Props {
  classes?: string;
  children?: React.ReactNode
  options? : {}
}

const Carousel = ({ classes, children, options }: Props) => {
  
  return (
    <div className={`${classes ? classes : ''} mb-10`}>
      <Slider {...options}>
        {children}
      </Slider>
    </div>
  );
};

export default Carousel;
