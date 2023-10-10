import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import React, { useMemo } from "react";
import { Box, styled } from "@mui/material";

import { IMAGES_TYPE } from "../ProductDetail";
import { LARGE_CAROUSEL_IMG, SMALL_CAROUSEL_IMG } from "@/constants";
import { ImageRatio, NextArrow, PrevArrow, Spacing } from "@/components";

type CarouselProps = {
  imageData: IMAGES_TYPE[];
  refCarousel: any;
};

const settingCarouselLarge = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // initialSlide: 1,
  arrows: true,
  infinite: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const settingCarouselSmall = {
  speed: 500,
  slidesToShow: 3,
  // initialSlide: 1,
  swipeToSlide: true,
  focusOnSelect: true,
  arrows: false,
};

export default function Carousel({ imageData, refCarousel }: CarouselProps) {
  const renderLargeImage = useMemo(() => {
    if (imageData == undefined) return null;

    return imageData.map((item, index) => {
      return (
        <StyledLargeImage
          key={index}
          ratio={LARGE_CAROUSEL_IMG}
          boxProps={{ sx: { pointerEvents: "none", cursor: "pointer" } }}
          imageProps={{ src: item.value, alt: "alt" }}
        />
      );
    });
  }, [imageData]);

  const renderSmallImage = useMemo(() => {
    if (imageData == undefined) return null;

    return imageData.map((item, index) => {
      return (
        <Box key={index} paddingLeft="4px" paddingRight="4px">
          <StyledLargeImage
            ratio={SMALL_CAROUSEL_IMG}
            boxProps={{ sx: { pointerEvents: "none", cursor: "pointer" } }}
            imageProps={{ src: item.value, alt: "alt" }}
          />
        </Box>
      );
    });
  }, [imageData]);

  return (
    <Box>
      <Slider
        asNavFor={refCarousel.ref2}
        ref={(slider: any) => {
          refCarousel.ref1 = slider;
          // refSlider.current.ref1 = slider;
          // setRefCarousel(slider);
        }}
        {...settingCarouselLarge}
      >
        {renderLargeImage}
      </Slider>

      <Spacing spacing={2} />

      <Slider
        asNavFor={refCarousel.ref1}
        ref={(slider: any) => {
          refCarousel.ref2 = slider;

          // setRefCarousel(ref2: slider)
          // refSlider.current.ref2 = slider;
        }}
        infinite={imageData.length > 3 ? true : false}
        {...settingCarouselSmall}
      >
        {renderSmallImage}
      </Slider>

      <Spacing spacing={6} />
    </Box>
  );
}

const StyledLargeImage = styled(ImageRatio)(() => {
  return {};
});
