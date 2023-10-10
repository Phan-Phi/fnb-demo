import { Box, Image, Link } from "@/components";
import { useSetting } from "@/hooks";
import { styled } from "@mui/material";
import React from "react";

export default function LogoHeader() {
  const setting = useSetting();

  const { logo } = setting;

  return (
    <Link href="/">
      <StyledBox>
        <Image src={"/image/logoFNB.png"} alt="logo" />
      </StyledBox>
    </Link>
  );
}

const StyledBox = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    width: "80px",
    height: "50px",

    [theme.breakpoints.down("md")]: {
      width: "42px",
      height: "42px",
    },
  };
});
