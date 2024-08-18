import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CarouselItem from './CarouselItem';

const SimpleCarousel = ({ carouselList }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        // <Container>
        <Slider {...settings}>
            {carouselList.map((item, index) => {
                return <CarouselItem imageUrl={item?.url} />;
            })}
        </Slider>
        // </Container>
    );
};

export default SimpleCarousel;
