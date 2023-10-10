import Slider, { Settings } from "react-slick";
import { Box, styled, BoxProps } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import NextArrow from "./NextArrow";
// import PrevArrow from "./PrevArrow";
// import { COLOR_DOTS_SLICK } from "@/constants";

interface StyledWrapperProps extends BoxProps {
  variant: string;
}

const createSettings = (variant: string) => {
  if (variant == "simple") {
    return {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
  } else {
    return {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      //   nextArrow: <NextArrow />,
      //   prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
          },
        },

        {
          breakpoint: 600,
          settings: {
            dots: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }
};

export default function SlickSlider({
  children,
  props,
  variant = "simple",
  refSlick,
}: {
  children: React.ReactNode;
  props?: Settings;
  variant?: "simple" | "multiple";
  refSlick?: any;
}) {
  return (
    <StyledWrapper variant={variant}>
      <Slider {...createSettings(variant)} ref={refSlick} {...props}>
        {children}
      </Slider>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "variant";
  },
})<StyledWrapperProps>(({ theme, variant }) => {
  return {
    [theme.breakpoints.up("lg")]: {
      padding: "0 3rem",
    },

    "& .slick-slide": {
      padding: variant == "multiple" ? "0.6rem" : 0,
    },
    "& .MuiSvgIcon-root": {
      //   color: theme.palette.neutral.neutral5,
      width: "45px",
      height: "45px",
      zIndex: 10,
      [theme.breakpoints.down("sm")]: {
        width: "30px",
        height: "30px",
      },
    },

    "& .prev": {
      position: "absolute",
      left: "-70px",
      top: "40%",
    },

    "& .next": {
      position: "absolute",
      right: "-70px",
      top: "40%",
    },

    "&  .slick-active button": {
      paddingTop: "3px !important",
    },
    "&  button::before": {
      //   background: COLOR_DOTS_SLICK,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: "10px !important",
      opacity: "1 !important",
    },
    "&  li": {
      margin: "0 !important",
    },

    "&  .slick-dots": {
      // width: "90%",
      display: "flex !important",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.625rem",

      left: "50%",
      transform: "translateX(-50%)",

      "& li.slick-active button:before": {
        opacity: ".75",
        color: "transparent",
      },

      "& li": {
        // width: "20px",
        // height: "20px",
        padding: "0 0.1rem",
        position: "relative",

        "& button": {
          padding: 0,
          width: "15px",
          height: "15px",
        },
      },

      "& .slick-active button::before": {
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        opacity: "1 !important",
        fontSize: "0.7rem",
        borderRadius: "10px !important",
      },

      "& .slick-active": {
        border: `1px solid ${theme.palette.primary.main} !important`,
        borderRadius: "1rem !important",
      },

      "& button::before": {
        fontSize: "0.7rem",
        color: "transparent",

        width: "12px",
        height: "12px",
        lineHeight: "15px",

        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    },
  };
});
