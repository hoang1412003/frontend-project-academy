import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';
import './slide.scss'
import img1 from '../../images/slide/Anh_chup_Man_hinh_2024_05_07_luc_21_08_28_e0279e99fc.webp'
import img2 from '../../images/slide/abstract_luxury_soft_red_background_christmas_valentines_layout_design_studio_room_web_template_business_report_with_smooth_circle_gradient_color_a6e2703ee6.webp'
import img3 from '../../images/slide/czc_banner_01_c98aff9a37.webp'
import img4 from '../../images/slide/vdfvdf_ec533c12f3.webp'
import img5 from '../../images/slide/desktop_banner_1920x850_6_d926faa84871ee540432a624158384de_10e6d3d698.webp'
import img6 from '../../images/slide/jhgjhghj_c343ebef1e.webp'

const items = [
    {
        src: img1,
        altText: '',
        caption: '',
        key: 1,
    },
    {
        src: img2,
        altText: '',
        caption: '',
        key: 2,
    },
    {
        src: img3,
        altText: '',
        caption: '',
        key: 3,
    },
    {
        src: img4,
        altText: '',
        caption: '',
        key: 3,
    },
    {
        src: img5,
        altText: '',
        caption: '',
        key: 3,
    },
    {
        src: img6,
        altText: '',
        caption: '',
        key: 3,
    },
];

function Slide(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem className='slide'
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}
        >
            <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />
            {slides}
            {/* <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
            /> */}
        </Carousel>
    );
}

export default Slide;